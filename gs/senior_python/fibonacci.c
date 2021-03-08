#include <stdio.h>
int value_n(int n)
{
    int i, t1=0,t2=1,t3=0;
    if (n<=0){
        return t1;
    }
    else if (n==1){
        return t2;
    }
    else{
        for (i=2;i<=n;i++){
            t3 = t1+t2;
            t1 = t2;
            t2 = t3;
        }
        return t3;
    }
}