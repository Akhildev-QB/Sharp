#!/bin/bash
fileName=size.txt
folders="_b _d _m _original _pvs _s _tmall _twOrig _twThumb _z _\"\""
printf "Sizes of Images\n------------------\n\n" > $fileName

for i in `seq 1 40`
do
	printf "Image$i\n" >> $fileName
	for j in $folders
	do
		FILENAME=output/$j/image_$i$j.jpg
		FILESIZE=$(stat -c%s "$FILENAME")
		DIV=1000
		KBFILESIZE=$((FILESIZE / DIV))
		printf "$KBFILESIZE\n" >> $fileName

	done
	printf "\n" >> $fileName
done