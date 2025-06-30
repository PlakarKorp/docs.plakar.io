#!/bin/sh

VERSION=main

if test x$1 != x"" ; then
    VERSION=$1
fi

tempfoo=`basename $0`
TMPDIR=`mktemp /tmp/${tempfoo}.XXXXXX` || exit 1
rm ${TMPDIR}
mkdir -p ${TMPDIR}

git clone https://github.com/PlakarKorp/plakar.git -b ${VERSION} ${TMPDIR}

echo
    cd ${TMPDIR}
    commit=`git log ${VERSION} | head -4 |  grep ^commit | cut -d' ' -f2`
    date=`git log ${VERSION} | head -4 |  grep ^Date: | cut -d' ' -f2`
    author=`git log ${VERSION} | head -4 |  grep ^Author: | cut -d' ' -f2,3,4,5`
    cd -  
echo

rm  -rf ./content/commands/plakar/${VERSION}/*

echo "generating documentation for ${VERSION}"
mkdir -p ./content/commands/plakar/${VERSION}/
TITLE=${VERSION}
if test ${VERSION} = "main" ; then
    TITLE="developers branch"
fi
cat <<EOF > ./content/commands/plakar/${VERSION}/_index.md
+++
title = "${TITLE}"
date = "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
weight = 3
chapter = false
sort = "title"
+++

{{%children description="false"%}}
EOF

SUBCMDDIR=subcommands
if ! test -d ${TMPDIR}/${SUBCMDDIR}; then
    SUBCMDDIR=cmd/plakar/subcommands
fi

DOCUMENTS=
for DOCUMENT in `ls ${TMPDIR}/${SUBCMDDIR}/help/docs |sort -r`; do
    DOCUMENTS="${DOCUMENTS} ${DOCUMENT}"
done

I=10
for DOCUMENT in ${DOCUMENTS}; do
    DOC_NAME=`echo ${DOCUMENT} | cut -d'.' -f1 |cut -d'-' -f2`
    SUMMARY=`grep '# NAME' -A 2 ${TMPDIR}/${SUBCMDDIR}/help/docs/${DOCUMENT} | tail -1 | cut -d'-' -f2 | sed 's/^ *//g'`
    echo $SUMMARY

    echo "generating documentation for ${DOC_NAME}"
    mkdir -p ./content/commands/plakar/${VERSION}/${DOC_NAME}

    cat <<EOF > ./content/commands/plakar/${VERSION}/${DOC_NAME}/index.md
---
date: "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
title: ${DOC_NAME}
summary: "${SUMMARY}"
---
EOF
    cat ${TMPDIR}/${SUBCMDDIR}/help/docs/${DOCUMENT} \
	| sed 's/^#/##/g' \
	| sed -E 's/plakar-([a-z]+)\(1\)/[&](..\/\1\/)/g' \
	| sed -E 's/plakar\(1\)/[plakar(1)](..\/plakar\/)/g' \
	      >> ./content/commands/plakar/${VERSION}/${DOC_NAME}/index.md
    I=`expr $I + 1`
done

rm -rf ${TMPDIR}
