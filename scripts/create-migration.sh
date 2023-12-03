#!/bin/bash
timestamp=$(date +%s)
cp ./src/utils/migration-skeleton.ts ./src/migrations/$timestamp-$1.ts