# ~/.bashrc: executed by bash(1) for non-login shells.

# Note: PS1 and umask are already set in /etc/profile. You should not
# need this unless you want different defaults for root.
# PS1='${debian_chroot:+($debian_chroot)}\h:\w\$ '
# umask 022

# You may uncomment the following lines if you want `ls' to be colorized:
# export LS_OPTIONS='--color=auto'
# eval "`dircolors`"
alias ls='ls $LS_OPTIONS'
alias ll='ls $LS_OPTIONS -l'
alias l='ls $LS_OPTIONS -lA'
#
# Some more alias to avoid making mistakes:
# alias rm='rm -i'
# alias cp='cp -i'
# alias mv='mv -i'

mywdir(){
    s=`ps -ef | grep py | grep -w 'gate gate'`
    if [ -n "${s}" ]; then
        d=`echo ${s} | awk {'print $2'} | xargs pwdx | awk -F : '{print $2}'`
        echo "璺宠浆鍒板伐浣滅洰褰? " ${d}
        cd ${d}
    else
        echo "娌℃壘鍒癵ate杩涚▼"
    fi
}
alias wdir=mywdir
alias tl='telnet 127.0.0.1'
