#!/usr/bin/env bash

sizes=("40" "58" "60" "80" "87" "120" "180" "1024")
file="caree"
extension="jpg"

mkdir "${file}"
for size in "${sizes[@]}" ; do
  sips -z "$size" "$size" "${file}.${extension}" --out "${file}/${size}px.${extension}"
done
