#import numpy as np 
import os
from numpy import*
import matplotlib.pyplot as pl  
ft=fft.fft;ift=fft.ifft; pi=pi;pt=pl.plot;abs=abs; fig=pl.figure
spt=pl.subplot;ar=arange;axx=pl.xlabel; axy=pl.ylabel; ap=append
pl.style.use('ggplot') # to create grid
#----FIR low pass filter implementation----
P = input('P= ') ; P = int(P) #coefficients number
B = input('B=') ; B = float(B)#cutting frequency
fce = input('fce=') ; fce = float(fce)#cutting frequency
K = int(P/2)
fc = B/2
#os.makedirs('C:\\Users\\PC\\desktop\\h', exist_ok=True)
if P==2*K+1:
    n=ar(-K,0)
    h=sin(2*pi*fc*n)/(n*pi); hr=h[K-1:0:-1]; hr=ap(hr,h[0])  
    h=ap(h,B);h=ap(h,hr)
    c=ar(-K,K+1)
else:
    n=ar(-K,0)+1/2
    h=sin(2*pi*fc*n)/(n*pi); hr=h[K-1:0:-1]; hr=ap(hr,h[0])
    h=ap(h,hr)
    c=ar(-K,K)+1/2
if fce != 0 :
    h = 2*cos(2 * pi * fce * c) * h
#-----plot RI h et RF  H-----P odd number
H=abs(ft(h))#; H=H0[K:2*K+1]; H=ap(H,H0[0:K])
f=c/P;f=f[K:2*K]
print(len(f))
fig(1)
axx('frequency');axy('RF')
pt(f,H[0:K]); #pl.show()
fig(2)
axx('time');axy('RI')
pt(c,h,'.k');pt(c,h,'r');pl.show()
print('maxh=',max(h))

#save('C:\\Users\\PC\\desktop\\h',h)
#Lx=512
#x=cos(2*pi*.1*ar(Lx))+cos(2*pi*.2*ar(Lx))+cos(2*pi*.3*ar(Lx))
#
#Lf=int(Lx/2)
#y=convolve(h,x);y=y[0:Lx]
#Y=abs(ft(y));fx=ar(Lx)/Lx;fx=fx[0:Lf]
#Y=Y[0:Lf]
#fig(3)
#pt(fx,Y);pl.show()