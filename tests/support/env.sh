#!/bin/bash

set -euo pipefail

if [ -d "$HOME/Library/Caches" ] ; then
    CACHE_DIR="$HOME/Library/Caches/grakn-spec"
elif [ -d "$HOME/.cache" ] ; then
    CACHE_DIR="$HOME/.cache/grakn-spec"
else
    >&2 echo "Could not find cache directory"
    exit 1
fi
mkdir -p $CACHE_DIR

GRAKN_DIR="${CACHE_DIR}/grakn"

# Simple keyspace counter so we have a fresh keyspace whenever
KEYSPACE_FILE="${CACHE_DIR}"/keyspace

function graql() {
    if [ -f "${GRAKN_DIR}/bin/graql.sh" ]; then
        "${GRAKN_DIR}/bin/graql.sh" "$@"
    else
        "${GRAKN_DIR}/graql" console "$@"
    fi
}

case $1 in
    start)
        VERSION=$2
        GRAKN_RELEASE="grakn-dist-${VERSION}"
        GRAKN_TAR="${GRAKN_RELEASE}.tar.gz"

        # If version just contains numbers and dots, it's a release
        if [[ $VERSION =~ ^[0-9.]+$ ]]; then
            DOWNLOAD_URL="https://github.com/graknlabs/grakn/releases/download/v${VERSION}/${GRAKN_TAR}"
            IS_RELEASE=true
        else
            DOWNLOAD_URL="https://jenkins.grakn.ai/job/grakn/job/${VERSION}/lastSuccessfulBuild/artifact/grakn-dist/target/${GRAKN_TAR}"
            IS_RELEASE=false
        fi

        set +e
        nc -z localhost 4567
        PORT_IN_USE=$?
        set -e

        DOWNLOAD_PATH="${CACHE_DIR}/${GRAKN_TAR}"

        if [ $IS_RELEASE = false ] || [ ! -f "$DOWNLOAD_PATH" ] ; then
            wget -O "$DOWNLOAD_PATH" "$DOWNLOAD_URL"
        fi

        if [ ! -d "$GRAKN_DIR" ]; then
            tar -xf "${DOWNLOAD_PATH}" -C "${CACHE_DIR}"

            mv "${CACHE_DIR}/${GRAKN_RELEASE}" "$GRAKN_DIR"
        fi

        echo "0" > $KEYSPACE_FILE

        if [ -f "${GRAKN_DIR}/bin/grakn.sh" ]; then
            "${GRAKN_DIR}/bin/grakn.sh" start
            sleep 5  # TODO: remove this when `grakn.sh start` blocks
        else 
            "${GRAKN_DIR}/grakn" server start
        fi

        echo "Add the following to your path:"
        echo "${GRAKN_DIR}/bin"
        ;;
    stop)
        if [ -f "${GRAKN_DIR}/bin/grakn.sh" ]; then
            "${GRAKN_DIR}/bin/grakn.sh" stop
        else
            "${GRAKN_DIR}/grakn" server stop
        fi
        rm -rf "$GRAKN_DIR"
        ;;
esac