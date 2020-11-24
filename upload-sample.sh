#!/bin/sh

SOURCE="./build/" # "/Users/me/Desktop/source/"
TARGET="/Users/me/Desktop/target/"
USER="username"
SERVER="server.ext"
PATH="/home/username/server.ext/"

function help() {
    echo " help : ";
    echo " > sh upload.sh test : Execute script with dry-run flag";
    echo " > sh upload.sh sync : Execute script big time";
}

echo "";
echo "### upload.sh ..."
echo "";

args=(
 -arvz
 --progress
 --delete
 --exclude='.DS_Store'
)

if [ $1 ]
then
    case "$1" in
        test)
            args+=(--dry-run)
            echo " - sh upload.sh test starting...";
            echo "";
            # rsync "${args[@]}" $SOURCE $TARGET
            /usr/bin/rsync "${args[@]}" -e /usr/bin/ssh $SOURCE $USER@$SERVER:$PATH
            echo "";
            echo " - sh upload.sh test done";
        ;;
        sync)
            echo " - sh upload.sh sync starting...";
            echo "";
            # rsync "${args[@]}" $SOURCE $TARGET
            /usr/bin/rsync "${args[@]}" -e /usr/bin/ssh $SOURCE $USER@$SERVER:$PATH
            echo "";
            echo " - sh upload.sh sync done";
        ;;
        *)
            help
        ;;
    esac
else
    help
fi

echo "";
echo "### ... Done!"
echo "";
