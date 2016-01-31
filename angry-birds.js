//Reference Image:
//http://static4.wikia.nocookie.net/__cb20110704171135/angrybirds/images/a/a3/AngryBirds1-1.png

//Save your stats here!
var stats = {
    moves: ["0"]
};

// standard procedure (may or may not be required)
//var ok = function(){return this.loadPixels;};
//if(!ok()){return;}

/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                     PHYSICS R US ENGINE                    *
*                                                            *
*                 Original version on Github:                *
*             https://github.com/juhl/physicsRus             *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

// 

/*
 * Copyright (c) 2012 Ju Hyung Lee
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
angleMode = "radians";  // required
var PRU=(function(){var a=function(){var w=(function(){return this.Math;})();var C=(function(){var Q=this.Date;return Q.now;})();w.clamp=function(R,S,Q){return R<S?S:(R>Q?Q:R);};w.log2=function(Q){return w.log(Q)/w.log(2);};var D=function(Q){return(Q/180)*w.PI;};var K=function(Q,R){this.x=Q||0;this.y=R||0;};K.zero=new (K)(0,0);K.prototype={set:function(Q,R){this.x=Q;this.y=R;return this;},copy:function(Q){this.x=Q.x;this.y=Q.y;return this;},duplicate:function(){return new (K)(this.x,this.y);},equal:function(Q){return(this.x!==Q.x||this.y!==Q.y)?false:true;},add:function(R,Q){this.x=R.x+Q.x;this.y=R.y+Q.y;return this;},addself:function(Q){this.x+=Q.x;this.y+=Q.y;return this;},sub:function(R,Q){this.x=R.x-Q.x;this.y=R.y-Q.y;return this;},subself:function(Q){this.x-=Q.x;this.y-=Q.y;return this;},scale:function(Q){this.x*=Q;this.y*=Q;return this;},scale2:function(Q){this.x*=Q.x;this.y*=Q.y;return this;},mad:function(Q,R){this.x+=Q.x*R;this.y+=Q.y*R;},neg:function(){this.x*=-1;this.y*=-1;return this;},rcp:function(){this.x=1/this.x;this.y=1/this.y;return this;},lengthsq:function(){return this.x*this.x+this.y*this.y;},length:function(){return w.sqrt(this.x*this.x+this.y*this.y);},normalize:function(){var Q=(this.x!==0||this.y!==0)?1/w.sqrt(this.x*this.x+this.y*this.y):0;this.x*=Q;this.y*=Q;return this;},dot:function(Q){return this.x*Q.x+this.y*Q.y;},cross:function(Q){return this.x*Q.y-this.y*Q.x;},toAngle:function(){return w.atan2(this.y,this.x);},rotation:function(Q){this.x=w.cos(Q);this.y=w.sin(Q);return this;},rotate:function(R){var S=w.cos(R);var Q=w.sin(R);return this.set(this.x*S-this.y*Q,this.x*Q+this.y*S);},lerp:function(S,R,Q){return this.add(K.scale(S,1-Q),K.scale(R,Q));}};K.add=function(R,Q){return new (K)(R.x+Q.x,R.y+Q.y);};K.sub=function(R,Q){return new (K)(R.x-Q.x,R.y-Q.y);};K.scale=function(Q,R){return new (K)(Q.x*R,Q.y*R);};K.scale2=function(Q,R){return new (K)(Q.x*R.x,Q.y*R.y);};K.mad=function(S,R,Q){return new (K)(S.x+R.x*Q,S.y+R.y*Q);};K.neg=function(Q){return new (K)(-Q.x,-Q.y);};K.rcp=function(Q){return new (K)(1/Q.x,1/Q.y);};K.normalize=function(R){var Q=(R.x!==0||R.y!==0)?1/w.sqrt(R.x*R.x+R.y*R.y):0;return new (K)(R.x*Q,R.y*Q);};K.dot=function(R,Q){return R.x*Q.x+R.y*Q.y;};K.cross=function(R,Q){return R.x*Q.y-R.y*Q.x;};K.toAngle=function(Q){return w.atan2(Q.y,Q.x);};K.rotation=function(Q){return new (K)(w.cos(Q),w.sin(Q));};K.rotate=function(Q,S){var T=w.cos(S);var R=w.sin(S);return new (K)(Q.x*T-Q.y*R,Q.x*R+Q.y*T);};K.perp=function(Q){return new (K)(-Q.y,Q.x);};K.rperp=function(Q){return new (K)(Q.y,-Q.x);};K.dist=function(T,S){var R=S.x-T.x;var Q=S.y-T.y;return w.sqrt(R*R+Q*Q);};K.distsq=function(T,S){var R=S.x-T.x;var Q=S.y-T.y;return R*R+Q*Q;};K.lerp=function(S,R,Q){return K.add(K.scale(S,1-Q),K.scale(R,Q));};K.truncate=function(Q,S){var R=Q.duplicate();var T=Q.x*Q.x+Q.y*Q.y;if(T>S*S){R.scale(S/w.sqrt(T));}return R;};var I=function(Q,S,R){this.x=Q||0;this.y=S||0;this.z=R||0;};I.zero=new (I)(0,0,0);I.prototype={set:function(Q,S,R){this.x=Q;this.y=S;this.z=R;return this;},copy:function(Q){this.x=Q.x;this.y=Q.y;this.z=Q.z;return this;},duplicate:function(){return new (I)(this.x,this.y,this.z);},equal:function(Q){return this.x!==Q.x||this.y!==Q.y||this.z!==Q.z?false:true;},add:function(R,Q){this.x=R.x+Q.x;this.y=R.y+Q.y;this.z=R.z+Q.z;return this;},addself:function(Q){this.x+=Q.x;this.y+=Q.y;this.z+=Q.z;return this;},sub:function(R,Q){this.x=R.x-Q.x;this.y=R.y-Q.y;this.z=R.z-Q.z;return this;},subself:function(Q){this.x-=Q.x;this.y-=Q.y;this.z-=Q.z;return this;},scale:function(Q){this.x*=Q;this.y*=Q;this.z*=Q;return this;},mad:function(Q,R){this.x+=Q.x*R;this.y+=Q.y*R;this.z+=Q.z*R;},neg:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this;},rcp:function(){this.x=1/this.x;this.y=1/this.y;this.z=1/this.z;return this;},lengthsq:function(){return this.x*this.x+this.y*this.y+this.z*this.z;},length:function(){return w.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);},normalize:function(){var Q=(this.x!==0||this.y!==0||this.z!==0)?1/w.sqrt(this.x*this.x+this.y*this.y+this.z*this.z):0;this.x*=Q;this.y*=Q;this.z*=Q;return this;},dot:function(Q){return this.x*Q.x+this.y*Q.y+this.z*Q.z;},toVec2:function(){return new (K)(this.x,this.y);}};I.fromVec2=function(Q,R){return new (I)(Q.x,Q.y,R);};I.truncate=function(Q,S){var R=Q.duplicate();var T=Q.x*Q.x+Q.y*Q.y+Q.z*Q.z;if(T>S*S){R.scale(S/w.sqrt(T));}return R;};var k=function(S,R,Q,T){this._11=S||0;this._12=R||0;this._21=Q||0;this._22=T||0;};k.zero=new (k)(0,0,0,0);k.prototype={set:function(S,R,Q,T){this._11=S;this._12=R;this._21=Q;this._22=T;return this;},copy:function(Q){this._11=Q._11;this._12=Q._12;this._21=Q._21;this._22=Q._22;return this;},duplicate:function(){return new (k)(this._11,this._12,this._21,this._22);},scale:function(Q){this._11*=Q;this._12*=Q;this._21*=Q;this._22*=Q;return this;},mul:function(Q){return this.set(this._11*Q._11+this._12*Q._21,this._11*Q._12+this._12*Q._22,this._21*Q._11+this._22*Q._21,this._21*Q._12+this._22*Q._22);},mulvec:function(Q){return new (K)(this._11*Q.x+this._12*Q.y,this._21*Q.x+this._22*Q.y);},invert:function(){var Q=this._11*this._22-this._12*this._21;if(Q!==0){Q=1/Q;}return this.set(this._22*Q,-this._12*Q,-this._21*Q,this._11*Q);},solve:function(Q){var R=this._11*this._22-this._12*this._21;if(R!==0){R=1/R;}return new (K)(R*(this._22*Q.x-this._12*Q.y),R*(this._11*Q.y-this._21*Q.x));}};k.mul=function(R,Q){return new (k)(R._11*Q._11+R._12*Q._21,R._11*Q._12+R._12*Q._22,R._21*Q._11+R._22*Q._21,R._21*Q._12+R._22*Q._22);};var h=function(V,U,T,S,R,Q,Y,X,W){this._11=V||0;this._12=U||0;this._13=T||0;this._21=S||0;this._22=R||0;this._23=Q||0;this._31=Y||0;this._32=X||0;this._33=W||0;};h.zero=new (h)(0,0,0,0,0,0,0,0,0);h.prototype={set:function(V,U,T,S,R,Q,Y,X,W){this._11=V;this._12=U;this._13=T;this._21=S;this._22=R;this._23=Q;this._31=Y;this._32=X;this._33=W;return this;},copy:function(Q){this._11=Q._11;this._12=Q._12;this._13=Q._13;this._21=Q._21;this._22=Q._22;this._23=Q._23;this._31=Q._31;this._32=Q._32;this._33=Q._33;return this;},duplicate:function(){return new (h)(this._11,this._12,this._13,this._21,this._22,this._23,this._31,this._32,this._33);},scale:function(Q){this._11*=Q;this._12*=Q;this._13*=Q;this._21*=Q;this._22*=Q;this._23*=Q;this._31*=Q;this._32*=Q;this._33*=Q;return this;},mul:function(Q){return this.set(this._11*Q._11+this._12*Q._21+this._13*Q._31,this._11*Q._12+this._12*Q._22+this._13*Q._32,this._11*Q._13+this._12*Q._23+this._13*Q._33,this._21*Q._11+this._22*Q._21+this._23*Q._31,this._21*Q._12+this._22*Q._22+this._23*Q._32,this._21*Q._13+this._22*Q._23+this._23*Q._33,this._31*Q._11+this._32*Q._21+this._33*Q._31,this._31*Q._12+this._32*Q._22+this._33*Q._32,this._31*Q._13+this._32*Q._23+this._33*Q._33);},mulvec:function(Q){return new (K)(this._11*Q.x+this._12*Q.y+this._13*Q.z,this._21*Q.x+this._22*Q.y+this._23*Q.z,this._31*Q.x+this._32*Q.y+this._33*Q.z);},invert:function(){var V=this._22*this._33-this._23*this._32;var U=this._23*this._31-this._21*this._33;var T=this._21*this._32-this._22*this._31;var W=this._11*V+this._12*U+this._13*T;if(W!==0){W=1/W;}var S=this._13*this._32-this._12*this._33;var R=this._11*this._33-this._13*this._31;var Q=this._12*this._31-this._11*this._32;var Z=this._12*this._23-this._13*this._22;var Y=this._13*this._21-this._11*this._23;var X=this._11*this._22-this._12*this._21;return this.set(V*W,U*W,T*W,S*W,R*W,Q*W,Z*W,Y*W,X*W);},solve2x2:function(Q){var R=this._11*this._22-this._12*this._21;if(R!==0){R=1/R;}return new (K)(R*(this._22*Q.x-this._12*Q.y),R*(this._11*Q.y-this._21*Q.x));},solve:function(Y){var V=this._22*this._33-this._23*this._32;var U=this._23*this._31-this._21*this._33;var T=this._21*this._32-this._22*this._31;var W=this._11*V+this._12*U+this._13*T;if(W!==0){W=1/W;}var S=this._13*this._32-this._12*this._33;var R=this._11*this._33-this._13*this._31;var Q=this._12*this._31-this._11*this._32;var aa=this._12*this._23-this._13*this._22;var Z=this._13*this._21-this._11*this._23;var X=this._11*this._22-this._12*this._21;return new (I)(W*(V*Y.x+U*Y.y+T*Y.z),W*(S*Y.x+R*Y.y+Q*Y.z),W*(aa*Y.x+Z*Y.y+X*Y.z));}};h.mul=function(R,Q){return new (h)(R._11*Q._11+R._12*Q._21+R._13*Q._31,R._11*Q._12+R._12*Q._22+R._13*Q._32,R._11*Q._13+R._12*Q._23+R._13*Q._33,R._21*Q._11+R._22*Q._21+R._23*Q._31,R._21*Q._12+R._22*Q._22+R._23*Q._32,R._21*Q._13+R._22*Q._23+R._23*Q._33,R._31*Q._11+R._32*Q._21+R._33*Q._31,R._31*Q._12+R._32*Q._22+R._33*Q._32,R._31*Q._13+R._32*Q._23+R._33*Q._33);};var M=function(R,Q){this.t=R.duplicate();this.c=w.cos(Q);this.s=w.sin(Q);};M.prototype={set:function(R,Q){this.t.copy(R);this.c=w.cos(Q);this.s=w.sin(Q);return this;},setRotation:function(Q){this.c=w.cos(Q);this.s=w.sin(Q);return this;},setPosition:function(Q){this.t.copy(Q);return this;},identity:function(){this.t.set(0,0);this.c=1;this.s=0;return this;},rotate:function(Q){return new (K)(Q.x*this.c-Q.y*this.s,Q.x*this.s+Q.y*this.c);},unrotate:function(Q){return new (K)(Q.x*this.c+Q.y*this.s,-Q.x*this.s+Q.y*this.c);},transform:function(Q){return new (K)(Q.x*this.c-Q.y*this.s+this.t.x,Q.x*this.s+Q.y*this.c+this.t.y);},untransform:function(Q){var S=Q.x-this.t.x;var R=Q.y-this.t.y;return new (K)(S*this.c+R*this.s,-S*this.s+R*this.c);}};var g=function(R,Q){this.mins=R?new (K)(R.x,R.y):new (K)(999999,999999);this.maxs=Q?new (K)(Q.x,Q.y):new (K)(-999999,-999999);};g.prototype={set:function(R,Q){this.mins.set(R.x,R.y);this.maxs.set(Q.x,Q.y);},copy:function(Q){this.mins.copy(Q.mins);this.maxs.copy(Q.maxs);return this;},clear:function(){this.mins.set(999999,999999);this.maxs.set(-999999,-999999);return this;},isEmpty:function(){if(this.mins.x>this.maxs.x||this.mins.y>this.maxs.y){return true;}},getCenter:function(){return K.scale(K.add(this.mins,this.maxs),0.5);},getExtent:function(){return K.scale(K.sub(this.maxs,this.mins),0.5);},getPerimeter:function(){return(this.maxs.x-this.mins.x+this.maxs.y-this.mins.y)*2;},addPoint:function(Q){if(this.mins.x>Q.x){this.mins.x=Q.x;}if(this.maxs.x<Q.x){this.maxs.x=Q.x;}if(this.mins.y>Q.y){this.mins.y=Q.y;}if(this.maxs.y<Q.y){this.maxs.y=Q.y;}return this;},addBounds:function(Q){if(this.mins.x>Q.mins.x){this.mins.x=Q.mins.x;}if(this.maxs.x<Q.maxs.x){this.maxs.x=Q.maxs.x;}if(this.mins.y>Q.mins.y){this.mins.y=Q.mins.y;}if(this.maxs.y<Q.maxs.y){this.maxs.y=Q.maxs.y;}return this;},addBounds2:function(R,Q){if(this.mins.x>R.x){this.mins.x=R.x;}if(this.maxs.x<Q.x){this.maxs.x=Q.x;}if(this.mins.y>R.y){this.mins.y=R.y;}if(this.maxs.y<Q.y){this.maxs.y=Q.y;}return this;},addExtents:function(Q,S,R){if(this.mins.x>Q.x-S){this.mins.x=Q.x-S;}if(this.maxs.x<Q.x+S){this.maxs.x=Q.x+S;}if(this.mins.y>Q.y-R){this.mins.y=Q.y-R;}if(this.maxs.y<Q.y+R){this.maxs.y=Q.y+R;}return this;},expand:function(R,Q){this.mins.x-=R;this.mins.y-=Q;this.maxs.x+=R;this.maxs.y+=Q;return this;},containPoint:function(Q){if(Q.x<this.mins.x||Q.x>this.maxs.x||Q.y<this.mins.y||Q.y>this.maxs.y){return false;}return true;},intersectsBounds:function(Q){if(this.mins.x>Q.maxs.x||this.maxs.x<Q.mins.x||this.mins.y>Q.maxs.y||this.maxs.y<Q.mins.y){return false;}return true;}};g.expand=function(Q,S,R){var Q=new (g)(Q.mins,Q.maxs);Q.expand(S,R);return Q;};this.vec2=K;this.vec3=I;this.mat2=k;this.mat3=h;this.Transform=M;this.Bounds=g;var s=function(R,Q){return w.PI*(R*R-Q*Q);};var J=function(T,Q,S,R){return T*((S*S+R*R)*0.5+Q.lengthsq());};var o=function(S,R,Q){return Q*(w.PI*Q+2*K.dist(S,R));};var A=function(R,Q){return K.scale(K.add(R,Q),0.5);};var x=function(T,R,Q){var S=K.distsq(Q,R);var U=K.scale(K.add(R,Q),0.5);return T*(S/12+U.lengthsq());};var v=function(S){var R=0;for(var Q=0;Q<S.length;Q++){R+=K.cross(S[Q],S[(Q+1)%S.length]);}return R/2;};var O=function(W){var S=0;var Q=new (K)(0,0);for(var R=0;R<W.length;R++){var V=W[R];var T=W[(R+1)%W.length];var U=K.cross(V,T);S+=U;Q.addself(K.scale(K.add(V,T),U));}return K.scale(Q,1/(3*S));};var d=function(U,Y,R){var S=0;var Q=0;for(var T=0;T<Y.length;T++){var Z=K.add(Y[T],R);var X=K.add(Y[(T+1)%Y.length],R);var W=K.cross(X,Z);var V=K.dot(Z,Z)+K.dot(Z,X)+K.dot(X,X);S+=W*V;Q+=W;}return(U*S)/(6*Q);};var L=function(R,Q,S){return R*(Q*Q+S*S)/12;};var i=function(ac){var X=0;var T=ac[0].x;for(var Y=1;Y<ac.length;Y++){var aa=ac[Y].x;if(aa>T||(aa===T&&ac[Y].y<ac[X].y)){X=Y;T=aa;}}var U=ac.length;var R=[];var V=0;var ad=X;while(1){R[V]=ad;var S=0;for(var W=1;W<U;W++){if(S===ad){S=W;continue;}var Q=K.sub(ac[S],ac[R[V]]);var ab=K.sub(ac[W],ac[R[V]]);var Z=K.cross(Q,ab);if(Z<0){S=W;}if(Z===0&&ab.lengthsq()>Q.lengthsq()){S=W;}}V++;ad=S;if(S===X){break;}}var ae=[];for(var Y=0;Y<V;++Y){ae.push(ac[R[Y]]);}return ae;};var j,n;var l={};(function(){var X=[];var Z=function(af,ae,ag){X[af*j.NUM_TYPES+ae]=ag;};var ad=function(ak,ah,aj,af,ai){var ap=ah+af;var ao=K.sub(aj,ak);var an=ao.lengthsq();if(an>ap*ap){return 0;}var am=w.sqrt(an);var ae=K.mad(ak,ao,0.5+(ah-af)*0.5/am);var ag=(am!==0)?K.scale(ao,1/am):K.zero;var al=am-ap;ai.push(new (n)(ae,ag,al,0));return 1;};var ab=function(af,ae,ag){return ad(af.tc,af.r,ae.tc,ae.r,ag);};var S=function(ae,ai,ah){var an=ae.r+ai.r;var aj=K.dot(ae.tc,ai.tn)-K.dot(ai.ta,ai.tn);var al=(aj<0?aj*-1:aj)-an;if(al>0){return 0;}var af=K.cross(ae.tc,ai.tn);var ak=K.cross(ai.ta,ai.tn);var am=K.cross(ai.tb,ai.tn);if(af<ak){if(af<ak-an){return 0;}return ad(ae.tc,ae.r,ai.ta,ai.r,ah);}else{if(af>am){if(af>am+an){return 0;}return ad(ae.tc,ae.r,ai.tb,ai.r,ah);}}var ag=(aj>0)?ai.tn:K.neg(ai.tn);ah.push(new (n)(K.mad(ae.tc,ag,-(ae.r+al*0.5)),K.neg(ag),al,0));return 1;};var W=function(ae,af,ak){var ar=-999999;var am=-1;for(var al=0;al<af.verts.length;al++){var an=af.tplanes[al];var ao=K.dot(ae.tc,an.n)-an.d-ae.r;if(ao>0){return 0;}else{if(ao>ar){ar=ao;am=al;}}}var aj=af.tplanes[am].n;var aq=af.tverts[am];var ap=af.tverts[(am+1)%af.verts.length];var ai=K.cross(aq,aj);var ag=K.cross(ap,aj);var ah=K.cross(ae.tc,aj);if(ah>ai){return ad(ae.tc,ae.r,aq,0,ak);}else{if(ah<ag){return ad(ae.tc,ae.r,ap,0,ak);}}ak.push(new (n)(K.mad(ae.tc,aj,-(ae.r+ar*0.5)),K.neg(aj),ar,0));return 1;};var V=function(af,ai){var ae=K.sub(ai,af.ta);var aj=K.sub(af.tb,af.ta);var ag=ae.dot(aj);if(ag<=0){return ae.dot(ae);}var ah=aj.dot(aj);if(ag>=ah){return ae.dot(ae)-2*ag+ah;}return ae.dot(ae)-ag*ag/ah;};var T=function(aq,ao,ae){var ah=[];ah[0]=V(aq,ao.ta);ah[1]=V(aq,ao.tb);ah[2]=V(ao,aq.ta);ah[3]=V(ao,aq.tb);var ag=ah[0]<ah[1]?0:1;var af=ah[2]<ah[3]?2:3;var aj=ah[ag]<ah[af]?ag:af;var ap,an;var al=K.sub(aq.tb,aq.ta);var ai=K.sub(ao.tb,ao.ta);switch(aj){case 0:ap=K.dot(K.sub(ao.ta,aq.ta),al)/K.dot(al,al);ap=ap<0?0:(ap>1?1:ap);an=0;break;case 1:ap=K.dot(K.sub(ao.tb,aq.ta),al)/K.dot(al,al);ap=ap<0?0:(ap>1?1:ap);an=1;break;case 2:ap=0;an=K.dot(K.sub(aq.ta,ao.ta),ai)/K.dot(ai,ai);an=an<0?0:(an>1?1:an);break;case 3:ap=1;an=K.dot(K.sub(aq.tb,ao.ta),ai)/K.dot(ai,ai);an=an<0?0:(an>1?1:an);break;}var am=K.mad(aq.ta,al,ap);var ak=K.mad(ao.ta,ai,an);return ad(am,aq.r,ak,ao.r,ae);};var aa=function(aj,ak,ae,am,an){var ah=K.cross(ak.tn,ak.ta);var af=K.cross(ak.tn,ak.tb);var ai=K.scale(ak.tn,an);for(var al=0;al<ae.verts.length;al++){var ao=ae.tverts[al];if(K.dot(ao,ai)<K.dot(ak.tn,ak.ta)*an+ak.r){var ag=K.cross(ak.tn,ao);if(ah>=ag&&ag>=af){aj.push(new (n)(ao,ai,am,(ae.id<<16)|al));}}}};var R=function(aj,ae,ai){var ap=K.dot(aj.tn,aj.ta);var ah=ae.distanceOnPlane(aj.tn,ap)-aj.r;if(ah>0){return 0;}var ag=ae.distanceOnPlane(K.neg(aj.tn),-ap)-aj.r;if(ag>0){return 0;}var al=-999999;var af=-1;for(var ak=0;ak<ae.verts.length;ak++){var an=ae.tplanes[ak];var ar=aj.distanceOnPlane(an.n,an.d);if(ar>0){return 0;}if(ar>al){al=ar;af=ak;}}var au=K.neg(ae.tplanes[af].n);var at=K.mad(aj.ta,au,aj.r);var aq=K.mad(aj.tb,au,aj.r);if(ae.containPoint(at)){ai.push(new (n)(at,au,al,(aj.id<<16)|0));}if(ae.containPoint(aq)){ai.push(new (n)(aq,au,al,(aj.id<<16)|1));}al-=0.1;if(ah>=al||ag>=al){if(ah>ag){aa(ai,aj,ae,ah,1);}else{aa(ai,aj,ae,ag,-1);}}if(ai.length===0){var ao=ae.tverts[af];var am=ae.tverts[(af+1)%ae.verts.length];if(ad(aj.ta,aj.r,ao,0,ai)){return 1;}if(ad(aj.tb,aj.r,ao,0,ai)){return 1;}if(ad(aj.ta,aj.r,am,0,ai)){return 1;}if(ad(aj.tb,aj.r,am,0,ai)){return 1;}}return ai.length;};var ac=function(ai,ag,af){var ae=-999999;var aj=-1;for(var ah=0;ah<af;ah++){var ak=ai.distanceOnPlane(ag[ah].n,ag[ah].d);if(ak>0){return{dist:0,index:-1};}else{if(ak>ae){ae=ak;aj=ah;}}}return{dist:ae,index:aj};};var Q=function(al,ae,ak,aj,ai){var ag=0;for(var ah=0;ah<ae.verts.length;ah++){var af=ae.tverts[ah];if(ak.containPointPartial(af,aj)){al.push(new (n)(af,aj,ai,(ae.id<<16)|ah));ag++;}}for(var ah=0;ah<ak.verts.length;ah++){var af=ak.tverts[ah];if(ae.containPointPartial(af,aj)){al.push(new (n)(af,aj,ai,(ak.id<<16)|ah));ag++;}}return ag;};var U=function(al,ae,ak,aj,ai){var ag=0;for(var ah=0;ah<ae.verts.length;ah++){var af=ae.tverts[ah];if(ak.containPoint(af)){al.push(new (n)(af,aj,ai,(ae.id<<16)|ah));ag++;}}for(var ah=0;ah<ak.verts.length;ah++){var af=ak.tverts[ah];if(ae.containPoint(af)){al.push(new (n)(af,aj,ai,(ak.id<<16)|ah));ag++;}}return ag>0?ag:Q(al,ae,ak,aj,ai);};var Y=function(ae,ai,ah){var ag=ac(ai,ae.tplanes,ae.verts.length);if(ag.index===-1){return 0;}var af=ac(ae,ai.tplanes,ai.verts.length);if(af.index===-1){return 0;}if(ag.dist>af.dist){return U(ah,ae,ai,ae.tplanes[ag.index].n,ag.dist);}return U(ah,ae,ai,K.neg(ai.tplanes[af.index].n),af.dist);};l.init=function(){Z(j.TYPE_CIRCLE,j.TYPE_CIRCLE,ab);Z(j.TYPE_CIRCLE,j.TYPE_SEGMENT,S);Z(j.TYPE_CIRCLE,j.TYPE_POLY,W);Z(j.TYPE_SEGMENT,j.TYPE_SEGMENT,T);Z(j.TYPE_SEGMENT,j.TYPE_POLY,R);Z(j.TYPE_POLY,j.TYPE_POLY,Y);};l.collide=function(af,ae,ah){if(af.type>ae.type){var ag=af;af=ae;ae=ag;}return X[af.type*j.NUM_TYPES+ae.type](af,ae,ah);};})();this.Collision=l;var t=function(Q,S,R){if(t.id_counter===undefined){t.id_counter=0;}this.id=t.id_counter++;this.name="body"+this.id;this.type=Q;S=S||new (K)(0,0);R=R||0;this.xf=new (M)(S,R);this.centroid=new (K)(0,0);this.p=new (K)(S.x,S.y);this.v=new (K)(0,0);this.f=new (K)(0,0);this.a=R;this.w=0;this.t=0;this.linearDamping=0;this.angularDamping=0;this.sleepTime=0;this.awaked=false;this.shapeArr=[];this.jointArr=[];this.jointHash={};this.bounds=new (g)();this.fixedRotation=false;this.categoryBits=1;this.maskBits=65535;this.stepCount=0;};t.STATIC=0;t.KINETIC=1;t.DYNAMIC=2;t.prototype={duplicate:function(){var Q=new (t)(this.type,this.xf.t,this.a);for(var R=0;R<this.shapeArr.length;R++){Q.addShape(this.shapeArr[R].duplicate());}Q.resetMassData();return Q;},isStatic:function(){return this.type===t.STATIC?true:false;},isDynamic:function(){return this.type===t.DYNAMIC?true:false;},isKinetic:function(){return this.type===t.KINETIC?true:false;},setType:function(Q){if(Q===this.type){return;}this.f.set(0,0);this.v.set(0,0);this.t=0;this.w=0;this.type=Q;this.awake(true);},addShape:function(Q){Q.body=this;this.shapeArr.push(Q);},removeShape:function(Q){var R=this.shapeArr.indexOf(Q);if(R!==-1){this.shapeArr.splice(R,1);Q.body=undefined;}},setMass:function(Q){this.m=Q;this.m_inv=Q>0?1/Q:0;},setInertia:function(Q){this.i=Q;this.i_inv=Q>0?1/Q:0;},setTransform:function(R,Q){this.xf.set(R,Q);this.p=this.xf.transform(this.centroid);this.a=Q;},syncTransform:function(){this.xf.setRotation(this.a);this.xf.setPosition(K.sub(this.p,this.xf.rotate(this.centroid)));},getWorldPoint:function(Q){return this.xf.transform(Q);},getWorldVector:function(Q){return this.xf.rotate(Q);},getLocalPoint:function(Q){return this.xf.untransform(Q);},getLocalVector:function(Q){return this.xf.unrotate(Q);},setFixedRotation:function(Q){this.fixedRotation=Q;this.resetMassData();},resetMassData:function(){this.centroid.set(0,0);this.m=0;this.m_inv=0;this.i=0;this.i_inv=0;if(!this.isDynamic()){this.p=this.xf.transform(this.centroid);return;}var U=new (K)(0,0);var T=0;var R=0;for(var S=0;S<this.shapeArr.length;S++){var W=this.shapeArr[S];var Q=W.centroid();var X=W.area()*W.density;var V=W.inertia(X);U.mad(Q,X);T+=X;R+=V;}this.centroid.copy(K.scale(U,1/T));this.setMass(T);if(!this.fixedRotation){this.setInertia(R-T*K.dot(this.centroid,this.centroid));}var Y=this.p;this.p=this.xf.transform(this.centroid);this.v.mad(K.perp(K.sub(this.p,Y)),this.w);},resetJointAnchors:function(){for(var Q=0;Q<this.jointArr.length;Q++){var T=this.jointArr[Q];if(!T){continue;}var S=T.getWorldAnchor1();var R=T.getWorldAnchor2();T.setWorldAnchor1(S);T.setWorldAnchor2(R);}},cacheData:function(){this.bounds.clear();for(var R=0;R<this.shapeArr.length;R++){var Q=this.shapeArr[R];Q.cacheData(this.xf);this.bounds.addBounds(Q.bounds);}},updateVelocity:function(S,R,Q){this.v=K.mad(this.v,K.mad(S,this.f,this.m_inv),R);this.w=this.w+this.t*this.i_inv*R;this.v.scale(w.clamp(1-R*(Q+this.linearDamping),0,1));this.w*=w.clamp(1-R*(Q+this.angularDamping),0,1);this.f.set(0,0);this.t=0;},updatePosition:function(Q){this.p.addself(K.scale(this.v,Q));this.a+=this.w*Q;},resetForce:function(){this.f.set(0,0);this.t=0;},applyForce:function(Q,R){if(!this.isDynamic()){return;}if(!this.isAwake()){this.awake(true);}this.f.addself(Q);this.t+=K.cross(K.sub(R,this.p),Q);},applyForceToCenter:function(Q){if(!this.isDynamic()){return;}if(!this.isAwake()){this.awake(true);}this.f.addself(Q);},applyTorque:function(Q){if(!this.isDynamic()){return;}if(!this.isAwake()){this.awake(true);}this.t+=Q;},applyLinearImpulse:function(R,Q){if(!this.isDynamic()){return;}if(!this.isAwake()){this.awake(true);}this.v.mad(R,this.m_inv);this.w+=K.cross(K.sub(Q,this.p),R)*this.i_inv;},applyAngularImpulse:function(Q){if(!this.isDynamic()){return;}if(!this.isAwake()){this.awake(true);}this.w+=Q*this.i_inv;},kineticEnergy:function(){var R=this.v.dot(this.v);var Q=this.w*this.w;return 0.5*(this.m*R+this.i*Q);},isAwake:function(){return this.awaked;},awake:function(Q){this.awaked=Q;if(Q){this.sleepTime=0;}else{this.v.set(0,0);this.w=0;this.f.set(0,0);this.t=0;}},isCollidable:function(Q){if(this===Q){return false;}if(!this.isDynamic()&&!Q.isDynamic()){return false;}if(!(this.maskBits&Q.categoryBits)||!(Q.maskBits&this.categoryBits)){return false;}for(var R=0;R<this.jointArr.length;R++){var S=this.jointArr[R];if(!S){continue;}if(!S.collideConnected&&Q.jointHash[S.id]!==undefined){return false;}}return true;}};this.Body=t;var q,N;var c=function(S,R,Q,T){if(arguments.length===0){return;}if(c.id_counter===undefined){c.id_counter=0;}this.id=c.id_counter++;this.type=S;this.body1=R;this.body2=Q;this.collideConnected=T;this.maxForce=9999999999;this.breakable=false;};c.TYPE_ANGLE=0;c.TYPE_REVOLUTE=1;c.TYPE_WELD=2;c.TYPE_WHEEL=3;c.TYPE_PRISMATIC=4;c.TYPE_DISTANCE=5;c.TYPE_ROPE=6;c.TYPE_MOUSE=7;c.LINEAR_SLOP=0.0008;c.ANGULAR_SLOP=D(2);c.MAX_LINEAR_CORRECTION=0.5;c.MAX_ANGULAR_CORRECTION=D(8);c.LIMIT_STATE_INACTIVE=0;c.LIMIT_STATE_AT_LOWER=1;c.LIMIT_STATE_AT_UPPER=2;c.LIMIT_STATE_EQUAL_LIMITS=3;c.prototype={getWorldAnchor1:function(){return this.body1.getWorldPoint(this.anchor1);},getWorldAnchor2:function(){return this.body2.getWorldPoint(this.anchor2);},setWorldAnchor1:function(Q){this.anchor1=this.body1.getLocalPoint(Q);},setWorldAnchor2:function(Q){this.anchor2=this.body2.getLocalPoint(Q);}};var E=function(R,Q){c.call(this,c.TYPE_ANGLE,R,Q,true);this.anchor1=new (K)(0,0);this.anchor2=new (K)(0,0);this.refAngle=Q.a-R.a;this.lambda_acc=0;};E.prototype=new (c)();E.prototype.constructor=E;N={setWorldAnchor1:function(Q){this.anchor1=new (K)(0,0);},setWorldAnchor2:function(Q){this.anchor2=new (K)(0,0);},initSolver:function(T,U){var R=this.body1;var Q=this.body2;this.maxImpulse=this.maxForce*T;var S=R.i_inv+Q.i_inv;this.em=S===0?0:1/S;if(U){R.w-=this.lambda_acc*R.i_inv;Q.w+=this.lambda_acc*Q.i_inv;}else{this.lambda_acc=0;}},solveVelocityConstraints:function(){var T=this.body1;var S=this.body2;var R=S.w-T.w;var Q=-this.em*R;this.lambda_acc+=Q;T.w-=Q*T.i_inv;S.w+=Q*S.i_inv;},solvePositionConstraints:function(){var S=this.body1;var R=this.body2;var U=R.a-S.a-this.refAngle;var Q=w.clamp(U,-c.MAX_ANGULAR_CORRECTION,c.MAX_ANGULAR_CORRECTION);var T=this.em*(-Q);S.a-=T*S.i_inv;R.a+=T*R.i_inv;return w.abs(U)<c.ANGULAR_SLOP;},getReactionForce:function(Q){return K.zero;},getReactionTorque:function(Q){return this.lambda_acc*Q;}};for(q in N){E.prototype[q]=N[q];}this.AngleJoint=E;var f=function(S,Q,R){c.call(this,c.TYPE_REVOLUTE,S,Q,false);this.anchor1=this.body1.getLocalPoint(R);this.anchor2=this.body2.getLocalPoint(R);this.refAngle=Q.a-S.a;this.lambda_acc=new (I)(0,0,0);this.motorLambda_acc=0;this.limitEnabled=false;this.limitLowerAngle=0;this.limitUpperAngle=0;this.limitState=c.LIMIT_STATE_INACTIVE;this.motorEnabled=false;this.motorSpeed=0;this.maxMotorTorque=0;};f.prototype=new (c)();f.prototype.constructor=f;N={setWorldAnchor1:function(Q){this.anchor1=this.body1.getLocalPoint(Q);this.anchor2=this.body2.getLocalPoint(Q);},setWorldAnchor2:function(Q){this.anchor1=this.body1.getLocalPoint(Q);this.anchor2=this.body2.getLocalPoint(Q);},enableMotor:function(Q){this.motorEnabled=Q;},setMotorSpeed:function(Q){this.motorSpeed=Q;},setMaxMotorTorque:function(Q){this.maxMotorTorque=Q;},enableLimit:function(Q){this.limitEnabled=Q;},setLimits:function(Q,R){this.limitLowerAngle=Q;this.limitUpperAngle=R;},initSolver:function(aa,W){var Z=this.body1;var X=this.body2;this.maxImpulse=this.maxForce*aa;if(!this.motorEnabled){this.motorLambda_acc=0;}else{this.maxMotorImpulse=this.maxMotorTorque*aa;}if(this.limitEnabled){var aj=X.a-Z.a-this.refAngle;if(w.abs(this.limitUpperAngle-this.limitLowerAngle)<c.ANGULAR_SLOP){this.limitState=c.LIMIT_STATE_EQUAL_LIMITS;}else{if(aj<=this.limitLowerAngle){if(this.limitState!==c.LIMIT_STATE_AT_LOWER){this.lambda_acc.z=0;}this.limitState=c.LIMIT_STATE_AT_LOWER;}else{if(aj>=this.limitUpperAngle){if(this.limitState!==c.LIMIT_STATE_AT_UPPER){this.lambda_acc.z=0;}this.limitState=c.LIMIT_STATE_AT_UPPER;}else{this.limitState=c.LIMIT_STATE_INACTIVE;this.lambda_acc.z=0;}}}}else{this.limitState=c.LIMIT_STATE_INACTIVE;}this.r1=Z.xf.rotate(K.sub(this.anchor1,Z.centroid));this.r2=X.xf.rotate(K.sub(this.anchor2,X.centroid));var T=Z.m_inv+X.m_inv;var ad=this.r1;var ac=this.r2;var Q=ad.x*Z.i_inv;var ab=ad.y*Z.i_inv;var V=ac.x*X.i_inv;var ah=ac.y*X.i_inv;var ai=T+ad.y*ab+ac.y*ah;var ag=-ad.x*ab-ac.x*ah;var af=-ab-ah;var S=T+ad.x*Q+ac.x*V;var R=Q+V;var Y=Z.i_inv+X.i_inv;this.em_inv=new (h)(ai,ag,af,ag,S,R,af,R,Y);if(Y!==0){this.em2=1/Y;}if(W){var U=new (K)(this.lambda_acc.x,this.lambda_acc.y);var ae=this.lambda_acc.z+this.motorLambda_acc;Z.v.mad(U,-Z.m_inv);Z.w-=(K.cross(this.r1,U)+ae)*Z.i_inv;X.v.mad(U,X.m_inv);X.w+=(K.cross(this.r2,U)+ae)*X.i_inv;}else{this.lambda_acc.set(0,0,0);this.motorLambda_acc=0;}},solveVelocityConstraints:function(){var Q=this.body1;var ae=this.body2;if(this.motorEnabled&&this.limitState!==c.LIMIT_STATE_EQUAL_LIMITS){var T=ae.w-Q.w-this.motorSpeed;var U=-this.em2*T;var ad=this.motorLambda_acc;this.motorLambda_acc=w.clamp(this.motorLambda_acc+U,-this.maxMotorImpulse,this.maxMotorImpulse);U=this.motorLambda_acc-ad;Q.w-=U*Q.i_inv;ae.w+=U*ae.i_inv;}if(this.limitEnabled&&this.limitState!==c.LIMIT_STATE_INACTIVE){var aa=K.mad(Q.v,K.perp(this.r1),Q.w);var Y=K.mad(ae.v,K.perp(this.r2),ae.w);var ac=K.sub(Y,aa);var ab=ae.w-Q.w;var T=I.fromVec2(ac,ab);var U=this.em_inv.solve(T.neg());if(this.limitState===c.LIMIT_STATE_EQUAL_LIMITS){this.lambda_acc.addself(U);}else{if(this.limitState===c.LIMIT_STATE_AT_LOWER||this.limitState===c.LIMIT_STATE_AT_UPPER){var X=this.lambda_acc.z+U.z;var R=this.limitState===c.LIMIT_STATE_AT_LOWER&&X<0;var Z=this.limitState===c.LIMIT_STATE_AT_UPPER&&X>0;if(R||Z){var V=K.add(ac,K.scale(new (K)(this.em_inv._13,this.em_inv._23),X));var W=this.em_inv.solve2x2(V.neg());U.x=W.x;U.y=W.y;U.z=-this.lambda_acc.z;this.lambda_acc.x+=U.x;this.lambda_acc.y+=U.y;this.lambda_acc.z=0;}else{this.lambda_acc.addself(U);}}}var S=new (K)(U.x,U.y);Q.v.mad(S,-Q.m_inv);Q.w-=(K.cross(this.r1,S)+U.z)*Q.i_inv;ae.v.mad(S,ae.m_inv);ae.w+=(K.cross(this.r2,S)+U.z)*ae.i_inv;}else{var aa=K.mad(Q.v,K.perp(this.r1),Q.w);var Y=K.mad(ae.v,K.perp(this.r2),ae.w);var T=K.sub(Y,aa);var U=this.em_inv.solve2x2(T.neg());this.lambda_acc.addself(I.fromVec2(U,0));Q.v.mad(U,-Q.m_inv);Q.w-=K.cross(this.r1,U)*Q.i_inv;ae.v.mad(U,ae.m_inv);ae.w+=K.cross(this.r2,U)*ae.i_inv;}},solvePositionConstraints:function(){var U=this.body1;var T=this.body2;var ae=0;var S=0;if(this.limitEnabled&&this.limitState!==c.LIMIT_STATE_INACTIVE){var ah=T.a-U.a-this.refAngle;var ag=0;if(this.limitState===c.LIMIT_STATE_EQUAL_LIMITS){var af=w.clamp(ah-this.limitLowerAngle,-c.MAX_ANGULAR_CORRECTION,c.MAX_ANGULAR_CORRECTION);ae=w.abs(af);ag=-this.em2*af;}else{if(this.limitState===c.LIMIT_STATE_AT_LOWER){var af=ah-this.limitLowerAngle;ae=-af;af=w.clamp(af+c.ANGULAR_SLOP,-c.MAX_ANGULAR_CORRECTION,0);ag=-this.em2*af;}else{if(this.limitState===c.LIMIT_STATE_AT_UPPER){var af=ah-this.limitUpperAngle;ae=af;af=w.clamp(af-c.ANGULAR_SLOP,0,c.MAX_ANGULAR_CORRECTION);ag=-this.em2*af;}}}U.a-=ag*U.i_inv;T.a+=ag*T.i_inv;}var Z=K.rotate(K.sub(this.anchor1,U.centroid),U.a);var Y=K.rotate(K.sub(this.anchor2,T.centroid),T.a);var af=K.sub(K.add(T.p,Y),K.add(U.p,Z));var X=K.truncate(af,c.MAX_LINEAR_CORRECTION);S=X.length();var R=U.m_inv+T.m_inv;var W=Z.y*U.i_inv;var ac=Y.y*T.i_inv;var ad=R+Z.y*W+Y.y*ac;var ab=-Z.x*W-Y.x*ac;var Q=R+Z.x*Z.x*U.i_inv+Y.x*Y.x*T.i_inv;var aa=new (k)(ad,ab,ab,Q);var V=aa.solve(X.neg());U.p.mad(V,-U.m_inv);U.a-=K.cross(Z,V)*U.i_inv;T.p.mad(V,T.m_inv);T.a+=K.cross(Y,V)*T.i_inv;return S<c.LINEAR_SLOP&&ae<c.ANGULAR_SLOP;},getReactionForce:function(Q){return K.scale(this.lambda_acc,Q);},getReactionTorque:function(Q){return 0;}};for(q in N){f.prototype[q]=N[q];}this.RevoluteJoint=f;var F=function(S,Q,R){c.call(this,c.TYPE_WELD,S,Q,false);this.anchor1=this.body1.getLocalPoint(R);this.anchor2=this.body2.getLocalPoint(R);this.gamma=0;this.beta_c=0;this.frequencyHz=0;this.dampingRatio=0;this.lambda_acc=new (I)(0,0,0);};F.prototype=new (c)();F.prototype.constructor=F;N={setWorldAnchor1:function(Q){this.anchor1=this.body1.getLocalPoint(Q);this.anchor2=this.body2.getLocalPoint(Q);},setWorldAnchor2:function(Q){this.anchor1=this.body1.getLocalPoint(Q);this.anchor2=this.body2.getLocalPoint(Q);},setSpringFrequencyHz:function(Q){this.frequencyHz=Q;},setSpringDampingRatio:function(Q){this.dampingRatio=Q;},initSolver:function(ab,X){var aa=this.body1;var Y=this.body2;this.maxImpulse=this.maxForce*ab;this.r1=aa.xf.rotate(K.sub(this.anchor1,aa.centroid));this.r2=Y.xf.rotate(K.sub(this.anchor2,Y.centroid));var U=aa.m_inv+Y.m_inv;var ah=this.r1;var ag=this.r2;var R=ah.x*aa.i_inv;var ae=ah.y*aa.i_inv;var W=ag.x*Y.i_inv;var al=ag.y*Y.i_inv;var am=U+ah.y*ae+ag.y*al;var ak=-ah.x*ae-ag.x*al;var aj=-ae-al;var T=U+ah.x*R+ag.x*W;var S=R+W;var Z=aa.i_inv+Y.i_inv;this.em_inv=new (h)(am,ak,aj,ak,T,S,aj,S,Z);if(this.frequencyHz>0){var ad=Z>0?1/Z:0;var ac=2*w.PI*this.frequencyHz;var af=ad*ac*ac;var ao=ad*2*this.dampingRatio*ac;this.gamma=(ao+af*ab)*ab;this.gamma=this.gamma===0?0:1/this.gamma;var an=ab*af*this.gamma;var Q=Y.a-aa.a;this.beta_c=an*Q;this.em_inv._33+=this.gamma;}else{this.gamma=0;this.beta_c=0;}if(X){var V=new (K)(this.lambda_acc.x,this.lambda_acc.y);var ai=this.lambda_acc.z;aa.v.mad(V,-aa.m_inv);aa.w-=(K.cross(this.r1,V)+ai)*aa.i_inv;Y.v.mad(V,Y.m_inv);Y.w+=(K.cross(this.r2,V)+ai)*Y.i_inv;}else{this.lambda_acc.set(0,0,0);}},solveVelocityConstraints:function(){var Q=this.body1;var Z=this.body2;if(this.frequencyHz>0){var X=Z.w-Q.w;var W=-(X+this.beta_c+this.gamma*this.lambda_acc.z)/this.em_inv._33;Q.w-=W*Q.i_inv;Z.w+=W*Z.i_inv;var V=K.mad(Q.v,K.perp(this.r1),Q.w);var U=K.mad(Z.v,K.perp(this.r2),Z.w);var Y=K.sub(U,V);var R=this.em_inv.solve2x2(Y.neg());this.lambda_acc.x+=R.x;this.lambda_acc.y+=R.y;this.lambda_acc.z+=W;Q.v.mad(R,-Q.m_inv);Q.w-=K.cross(this.r1,R)*Q.i_inv;Z.v.mad(R,Z.m_inv);Z.w+=K.cross(this.r2,R)*Z.i_inv;}else{var V=K.mad(Q.v,K.perp(this.r1),Q.w);var U=K.mad(Z.v,K.perp(this.r2),Z.w);var Y=K.sub(U,V);var X=Z.w-Q.w;var S=I.fromVec2(Y,X);var T=this.em_inv.solve(S.neg());this.lambda_acc.addself(T);var R=new (K)(T.x,T.y);Q.v.mad(R,-Q.m_inv);Q.w-=(K.cross(this.r1,R)+T.z)*Q.i_inv;Z.v.mad(R,Z.m_inv);Z.w+=(K.cross(this.r2,R)+T.z)*Z.i_inv;}},solvePositionConstraints:function(){var Y=this.body1;var W=this.body2;var af=K.rotate(K.sub(this.anchor1,Y.centroid),Y.a);var ae=K.rotate(K.sub(this.anchor2,W.centroid),W.a);var U=Y.m_inv+W.m_inv;var R=af.x*Y.i_inv;var ac=af.y*Y.i_inv;var V=ae.x*W.i_inv;var aj=ae.y*W.i_inv;var ak=U+af.y*ac+ae.y*aj;var ai=-af.x*ac-ae.x*aj;var ah=-ac-aj;var T=U+af.x*R+ae.x*V;var S=R+V;var X=Y.i_inv+W.i_inv;var ag=new (h)(ak,ai,ah,ai,T,S,ah,S,X);var ab,aa;if(this.frequencyHz>0){ab=K.sub(K.add(W.p,ae),K.add(Y.p,af));aa=0;var ad=K.truncate(ab,c.MAX_LINEAR_CORRECTION);var Q=ag.solve2x2(ad.neg());Y.p.mad(Q,-Y.m_inv);Y.a-=K.cross(af,Q)*Y.i_inv;W.p.mad(Q,W.m_inv);W.a+=K.cross(ae,Q)*W.i_inv;}else{ab=K.sub(K.add(W.p,ae),K.add(Y.p,af));aa=W.a-Y.a;var ad=I.fromVec2(K.truncate(ab,c.MAX_LINEAR_CORRECTION),w.clamp(aa,-c.MAX_ANGULAR_CORRECTION,c.MAX_ANGULAR_CORRECTION));var Z=ag.solve(ad.neg());var Q=new (K)(Z.x,Z.y);Y.p.mad(Q,-Y.m_inv);Y.a-=(K.cross(af,Q)+Z.z)*Y.i_inv;W.p.mad(Q,W.m_inv);W.a+=(K.cross(ae,Q)+Z.z)*W.i_inv;}return ab.length()<c.LINEAR_SLOP&&w.abs(aa)<=c.ANGULAR_SLOP;},getReactionForce:function(Q){return K.scale(this.lambda_acc.toVec2(),Q);},getReactionTorque:function(Q){return this.lambda_acc.z*Q;}};for(q in N){F.prototype[q]=N[q];}this.WeldJoint=F;var r=function(R,Q,T,S){c.call(this,c.TYPE_WHEEL,R,Q,true);this.anchor1=this.body1.getLocalPoint(T);this.anchor2=this.body2.getLocalPoint(S);var U=K.sub(S,T);this.restLength=U.length();this.u_local=this.body1.getLocalVector(K.normalize(U));this.n_local=K.perp(this.u_local);this.lambda_acc=0;this.motorLambda_acc=0;this.springLambda_acc=0;this.motorEnabled=false;this.motorSpeed=0;this.maxMotorTorque=0;this.gamma=0;this.beta_c=0;this.frequencyHz=0;this.dampingRatio=0;};r.prototype=new (c)();r.prototype.constructor=r;N={setWorldAnchor1:function(Q){this.anchor1=this.body1.getLocalPoint(Q);var R=K.sub(this.getWorldAnchor2(),Q);this.u_local=this.body1.getLocalVector(K.normalize(R));this.n_local=K.perp(this.u_local);},setWorldAnchor2:function(Q){this.anchor2=this.body2.getLocalPoint(Q);var R=K.sub(Q,this.getWorldAnchor1());this.u_local=this.body1.getLocalVector(K.normalize(R));this.n_local=K.perp(this.u_local);},setSpringFrequencyHz:function(Q){this.frequencyHz=Q;},setSpringDampingRatio:function(Q){this.dampingRatio=Q;},enableMotor:function(Q){this.motorEnabled=Q;},setMotorSpeed:function(Q){this.motorSpeed=Q;},setMaxMotorTorque:function(Q){this.maxMotorTorque=Q;},initSolver:function(Z,W){var Y=this.body1;var X=this.body2;this.maxImpulse=this.maxForce*Z;this.r1=Y.xf.rotate(K.sub(this.anchor1,Y.centroid));this.r2=X.xf.rotate(K.sub(this.anchor2,X.centroid));var S=K.add(Y.p,this.r1);var R=K.add(X.p,this.r2);var ae=K.sub(R,S);this.r1_d=K.add(this.r1,ae);this.n=K.rotate(this.n_local,Y.a);this.sn1=K.cross(this.r1_d,this.n);this.sn2=K.cross(this.r2,this.n);var ad=Y.m_inv+X.m_inv+Y.i_inv*this.sn1*this.sn1+X.i_inv*this.sn2*this.sn2;this.em=ad>0?1/ad:ad;if(this.frequencyHz>0){this.u=K.rotate(this.u_local,Y.a);this.su1=K.cross(this.r1_d,this.u);this.su2=K.cross(this.r2,this.u);var T=Y.m_inv+X.m_inv+Y.i_inv*this.su1*this.su1+X.i_inv*this.su2*this.su2;var ai=T===0?0:1/T;var aa=2*w.PI*this.frequencyHz;var ac=ai*aa*aa;var ag=ai*2*this.dampingRatio*aa;this.gamma=(ag+ac*Z)*Z;this.gamma=this.gamma===0?0:1/this.gamma;var af=Z*ac*this.gamma;var Q=K.dot(ae,this.u)-this.restLength;this.beta_c=af*Q;T=T+this.gamma;this.springEm=T===0?0:1/T;}else{this.gamma=0;this.beta_c=0;this.springLambda_acc=0;}if(this.motorEnabled){this.maxMotorImpulse=this.maxMotorTorque*Z;var ah=Y.i_inv+X.i_inv;this.motorEm=ah>0?1/ah:ah;}else{this.motorEm=0;this.motorLambda_acc=0;}if(W){var ab=K.scale(this.n,this.lambda_acc);var V=this.sn1*this.lambda_acc+this.motorLambda_acc;var U=this.sn2*this.lambda_acc+this.motorLambda_acc;if(this.frequencyHz>0){ab.addself(K.scale(this.u,this.springLambda_acc));V+=this.su1*this.springLambda_acc;U+=this.su2*this.springLambda_acc;}Y.v.mad(ab,-Y.m_inv);Y.w-=V*Y.i_inv;X.v.mad(ab,X.m_inv);X.w+=U*X.i_inv;}else{this.lambda_acc=0;this.springLambda_acc=0;this.motorLambda_acc=0;}},solveVelocityConstraints:function(){var U=this.body1;var T=this.body2;if(this.frequencyHz>0){var S=this.u.dot(K.sub(T.v,U.v))+this.su2*T.w-this.su1*U.w;var R=this.beta_c+this.gamma*this.springLambda_acc;var Q=-this.springEm*(S+R);this.springLambda_acc+=Q;var W=K.scale(this.u,Q);U.v.mad(W,-U.m_inv);U.w-=this.su1*Q*U.i_inv;T.v.mad(W,T.m_inv);T.w+=this.su2*Q*T.i_inv;}if(this.motorEnabled){var S=T.w-U.w-this.motorSpeed;var Q=-this.motorEm*S;var V=this.motorLambda_acc;this.motorLambda_acc=w.clamp(this.motorLambda_acc+Q,-this.maxMotorImpulse,this.maxMotorImpulse);Q=this.motorLambda_acc-V;U.w-=Q*U.i_inv;T.w+=Q*T.i_inv;}var S=this.n.dot(K.sub(T.v,U.v))+this.sn2*T.w-this.sn1*U.w;var Q=-this.em*S;this.lambda_acc+=Q;var W=K.scale(this.n,Q);U.v.mad(W,-U.m_inv);U.w-=this.sn1*Q*U.i_inv;T.v.mad(W,T.m_inv);T.w+=this.sn2*Q*T.i_inv;},solvePositionConstraints:function(){var Q=this.body1;var ag=this.body2;var U=K.rotate(K.sub(this.anchor1,Q.centroid),Q.a);var S=K.rotate(K.sub(this.anchor2,ag.centroid),ag.a);var af=K.add(Q.p,U);var ae=K.add(ag.p,S);var aa=K.sub(ae,af);var Y=K.add(U,aa);var T=K.rotate(this.n_local,Q.a);var ab=K.dot(T,aa);var Z=w.clamp(ab,-c.MAX_LINEAR_CORRECTION,c.MAX_LINEAR_CORRECTION);var ad=K.cross(Y,T);var ac=K.cross(S,T);var R=Q.m_inv+ag.m_inv+Q.i_inv*ad*ad+ag.i_inv*ac*ac;var W=R===0?0:1/R;var X=W*(-Z);var V=K.scale(T,X);Q.p.mad(V,-Q.m_inv);Q.a-=ad*X*Q.i_inv;ag.p.mad(V,ag.m_inv);ag.a+=ac*X*ag.i_inv;return w.abs(ab)<c.LINEAR_SLOP;},getReactionForce:function(Q){return K.scale(this.n,this.lambda_acc*Q);},getReactionTorque:function(Q){return 0;}};for(q in N){r.prototype[q]=N[q];}this.WheelJoint=r;var y=function(R,Q,T,S){c.call(this,c.TYPE_PRISMATIC,R,Q,true);this.anchor1=this.body1.getLocalPoint(T);this.anchor2=this.body2.getLocalPoint(S);var U=K.sub(S,T);this.n_local=this.body1.getLocalVector(K.normalize(K.perp(U)));this.da=Q.a-R.a;this.lambda_acc=new (K)(0,0);};y.prototype=new (c)();y.prototype.constructor=y;N={setWorldAnchor1:function(Q){this.anchor1=this.body1.getLocalPoint(Q);var R=K.sub(this.getWorldAnchor2(),Q);this.n_local=this.body1.getLocalVector(K.normalize(K.perp(R)));},setWorldAnchor2:function(Q){this.anchor2=this.body2.getLocalPoint(Q);var R=K.sub(Q,this.getWorldAnchor1());this.n_local=this.body1.getLocalVector(K.normalize(K.perp(R)));},initSolver:function(V,X){var S=this.body1;var ae=this.body2;this.maxImpulse=this.maxForce*V;this.r1=S.xf.rotate(K.sub(this.anchor1,S.centroid));this.r2=ae.xf.rotate(K.sub(this.anchor2,ae.centroid));var ad=K.add(S.p,this.r1);var ab=K.add(ae.p,this.r2);var Y=K.sub(ab,ad);this.r1_d=K.add(this.r1,Y);this.n=K.normalize(K.perp(Y));this.s1=K.cross(this.r1_d,this.n);this.s2=K.cross(this.r2,this.n);var ac=this.s1;var aa=this.s2;var R=ac*S.i_inv;var W=aa*ae.i_inv;var T=S.m_inv+ae.m_inv+ac*R+aa*W;var Q=R+W;var Z=S.i_inv+ae.i_inv;this.em_inv=new (k)(T,Q,Q,Z);if(X){var U=K.scale(this.n,this.lambda_acc.x);S.v.mad(U,-S.m_inv);S.w-=(this.s1*this.lambda_acc.x+this.lambda_acc.y)*S.i_inv;ae.v.mad(U,ae.m_inv);ae.w+=(this.s2*this.lambda_acc.x+this.lambda_acc.y)*ae.i_inv;}else{this.lambda_acc.set(0,0);}},solveVelocityConstraints:function(){var S=this.body1;var R=this.body2;var V=this.n.dot(K.sub(R.v,S.v))+this.s2*R.w-this.s1*S.w;var U=R.w-S.w;var Q=this.em_inv.solve(new (K)(-V,-U));this.lambda_acc.addself(Q);var T=K.scale(this.n,Q.x);S.v.mad(T,-S.m_inv);S.w-=(this.s1*Q.x+Q.y)*S.i_inv;R.v.mad(T,R.m_inv);R.w+=(this.s2*Q.x+Q.y)*R.i_inv;},solvePositionConstraints:function(){var Y=this.body1;var X=this.body2;var ah=K.rotate(K.sub(this.anchor1,Y.centroid),Y.a);var af=K.rotate(K.sub(this.anchor2,X.centroid),X.a);var R=K.add(Y.p,ah);var Q=K.add(X.p,af);var ak=K.sub(Q,R);var V=K.add(ah,ak);var ad=K.rotate(this.n_local,Y.a);var ac=K.dot(ad,ak);var ab=X.a-Y.a-this.da;var ae=new (K)();ae.x=w.clamp(ac,-c.MAX_LINEAR_CORRECTION,c.MAX_LINEAR_CORRECTION);ae.y=w.clamp(ab,-c.MAX_ANGULAR_CORRECTION,c.MAX_ANGULAR_CORRECTION);var T=K.cross(V,ad);var S=K.cross(af,ad);var W=T*Y.i_inv;var al=S*X.i_inv;var aj=Y.m_inv+X.m_inv+T*W+S*al;var ai=W+al;var U=Y.i_inv+X.i_inv;var ag=new (k)(aj,ai,ai,U);var Z=ag.solve(ae.neg());var aa=K.scale(ad,Z.x);Y.p.mad(aa,-Y.m_inv);Y.a-=(K.cross(V,aa)+Z.y)*Y.i_inv;X.p.mad(aa,X.m_inv);X.a+=(K.cross(af,aa)+Z.y)*X.i_inv;return w.abs(ac)<=c.LINEAR_SLOP&&w.abs(ab)<=c.ANGULAR_SLOP;},getReactionForce:function(Q){return K.scale(this.n,this.lambda_acc.x*Q);},getReactionTorque:function(Q){return this.lambda_acc.y*Q;}};for(q in N){y.prototype[q]=N[q];}this.PrismaticJoint=y;var H=function(R,Q,T,S){c.call(this,c.TYPE_DISTANCE,R,Q,true);this.anchor1=this.body1.getLocalPoint(T);this.anchor2=this.body2.getLocalPoint(S);this.restLength=K.dist(T,S);this.gamma=0;this.beta_c=0;this.frequencyHz=0;this.dampingRatio=0;this.lambda_acc=0;};H.prototype=new (c)();H.prototype.constructor=H;N={setWorldAnchor1:function(Q){this.anchor1=this.body1.getLocalPoint(Q);this.restLength=K.dist(Q,this.getWorldAnchor2());},setWorldAnchor2:function(Q){this.anchor2=this.body2.getLocalPoint(Q);this.restLength=K.dist(Q,this.getWorldAnchor1());},setSpringFrequencyHz:function(Q){this.frequencyHz=Q;},setSpringDampingRatio:function(Q){this.dampingRatio=Q;},initSolver:function(S,V){var Q=this.body1;var ac=this.body2;this.maxImpulse=this.maxForce*S;this.r1=Q.xf.rotate(K.sub(this.anchor1,Q.centroid));this.r2=ac.xf.rotate(K.sub(this.anchor2,ac.centroid));var W=K.sub(K.add(ac.p,this.r2),K.add(Q.p,this.r1));var Y=W.length();if(Y>c.LINEAR_SLOP){this.u=K.scale(W,1/Y);}else{this.u=K.zero;}this.s1=K.cross(this.r1,this.u);this.s2=K.cross(this.r2,this.u);var T=Q.m_inv+ac.m_inv+Q.i_inv*this.s1*this.s1+ac.i_inv*this.s2*this.s2;this.em=T===0?0:1/T;if(this.frequencyHz>0){var ab=2*w.PI*this.frequencyHz;var U=this.em*ab*ab;var X=this.em*2*this.dampingRatio*ab;this.gamma=(X+U*S)*S;this.gamma=this.gamma===0?0:1/this.gamma;var aa=S*U*this.gamma;var Z=Y-this.restLength;this.beta_c=aa*Z;T=T+this.gamma;this.em=T===0?0:1/T;}else{this.gamma=0;this.beta_c=0;}if(V){var R=K.scale(this.u,this.lambda_acc);Q.v.mad(R,-Q.m_inv);Q.w-=this.s1*this.lambda_acc*Q.i_inv;ac.v.mad(R,ac.m_inv);ac.w+=this.s2*this.lambda_acc*ac.i_inv;}else{this.lambda_acc=0;}},solveVelocityConstraints:function(){var U=this.body1;var T=this.body2;var S=this.u.dot(K.sub(T.v,U.v))+this.s2*T.w-this.s1*U.w;var R=this.beta_c+this.gamma*this.lambda_acc;var Q=-this.em*(S+R);this.lambda_acc+=Q;var V=K.scale(this.u,Q);U.v.mad(V,-U.m_inv);U.w-=this.s1*Q*U.i_inv;T.v.mad(V,T.m_inv);T.w+=this.s2*Q*T.i_inv;},solvePositionConstraints:function(){if(this.frequencyHz>0){return true;}var Q=this.body1;var ad=this.body2;var T=K.rotate(K.sub(this.anchor1,Q.centroid),Q.a);var S=K.rotate(K.sub(this.anchor2,ad.centroid),ad.a);var X=K.sub(K.add(ad.p,S),K.add(Q.p,T));var Z=X.length();var ac=K.scale(X,1/Z);var Y=Z-this.restLength;var W=w.clamp(Y,-c.MAX_LINEAR_CORRECTION,c.MAX_LINEAR_CORRECTION);var ab=K.cross(T,ac);var aa=K.cross(S,ac);var R=Q.m_inv+ad.m_inv+Q.i_inv*ab*ab+ad.i_inv*aa*aa;var V=R===0?0:-W/R;var U=K.scale(ac,V);Q.p.mad(U,-Q.m_inv);Q.a-=ab*V*Q.i_inv;ad.p.mad(U,ad.m_inv);ad.a+=aa*V*ad.i_inv;return w.abs(Y)<c.LINEAR_SLOP;},getReactionForce:function(Q){return K.scale(this.u,this.lambda_acc*Q);},getReactionTorque:function(Q){return 0;}};for(q in N){H.prototype[q]=N[q];}this.DistanceJoint=H;var e=function(R,Q,T,S){c.call(this,c.TYPE_ROPE,R,Q,true);this.anchor1=this.body1.getLocalPoint(T);this.anchor2=this.body2.getLocalPoint(S);this.maxDistance=K.dist(T,S);this.lambda_acc=0;};e.prototype=new (c)();e.prototype.constructor=e;N={setWorldAnchor1:function(Q){this.anchor1=this.body1.getLocalPoint(Q);this.maxDistance=K.dist(Q,this.getWorldAnchor2());},setWorldAnchor2:function(Q){this.anchor2=this.body2.getLocalPoint(Q);this.maxDistance=K.dist(Q,this.getWorldAnchor1());},initSolver:function(T,W){var R=this.body1;var Q=this.body2;this.maxImpulse=this.maxForce*T;this.r1=R.xf.rotate(K.sub(this.anchor1,R.centroid));this.r2=Q.xf.rotate(K.sub(this.anchor2,Q.centroid));var V=K.sub(K.add(Q.p,this.r2),K.add(R.p,this.r1));this.distance=V.length();var X=this.distance-this.maxDistance;if(X>0){this.cdt=0;this.limitState=c.LIMIT_STATE_AT_UPPER;}else{this.cdt=X/T;this.limitState=c.LIMIT_STATE_INACTIVE;}if(this.distance>c.LINEAR_SLOP){this.u=K.scale(V,1/this.distance);}else{this.u=K.zero;}this.s1=K.cross(this.r1,this.u);this.s2=K.cross(this.r2,this.u);var S=R.m_inv+Q.m_inv+R.i_inv*this.s1*this.s1+Q.i_inv*this.s2*this.s2;this.em=S===0?0:1/S;if(W){var U=K.scale(this.u,this.lambda_acc);R.v.mad(U,-R.m_inv);R.w-=this.s1*this.lambda_acc*R.i_inv;Q.v.mad(U,Q.m_inv);Q.w+=this.s2*this.lambda_acc*Q.i_inv;}else{this.lambda_acc=0;}},solveVelocityConstraints:function(){var T=this.body1;var S=this.body2;var R=this.u.dot(K.sub(S.v,T.v))+this.s2*S.w-this.s1*T.w;var Q=-this.em*(R+this.cdt);var U=this.lambda_acc;this.lambda_acc=w.min(U+Q,0);Q=this.lambda_acc-U;var V=K.scale(this.u,Q);T.v.mad(V,-T.m_inv);T.w-=this.s1*Q*T.i_inv;S.v.mad(V,S.m_inv);S.w+=this.s2*Q*S.i_inv;},solvePositionConstraints:function(){var Q=this.body1;var ad=this.body2;var T=K.rotate(K.sub(this.anchor1,Q.centroid),Q.a);var S=K.rotate(K.sub(this.anchor2,ad.centroid),ad.a);var X=K.sub(K.add(ad.p,S),K.add(Q.p,T));var Z=X.length();var ac=K.scale(X,1/Z);var Y=Z-this.maxDistance;var W=w.clamp(Y,0,c.MAX_LINEAR_CORRECTION);var ab=K.cross(T,ac);var aa=K.cross(S,ac);var R=Q.m_inv+ad.m_inv+Q.i_inv*ab*ab+ad.i_inv*aa*aa;var V=R===0?0:-W/R;var U=K.scale(ac,V);Q.p.mad(U,-Q.m_inv);Q.a-=ab*V*Q.i_inv;ad.p.mad(U,ad.m_inv);ad.a+=aa*V*ad.i_inv;return Y<c.LINEAR_SLOP;},getReactionForce:function(Q){return K.scale(this.u,this.lambda_acc*Q);},getReactionTorque:function(Q){return 0;}};for(q in N){e.prototype[q]=N[q];}this.RopeJoint=e;var G=function(R,Q,S){if(arguments.length===0){return;}c.call(this,c.TYPE_MOUSE,R,Q,true);this.anchor1=this.body1.getLocalPoint(S);this.anchor2=this.body2.getLocalPoint(S);this.gamma=0;this.beta_c=0;this.frequencyHz=5;this.dampingRatio=0.9;this.lambda_acc=new (K)(0,0);};G.prototype=new (c)();G.prototype.constructor=G;N={setSpringFrequencyHz:function(Q){this.frequencyHz=Q;},setSpringDampingRatio:function(Q){this.dampingRatio=Q;},initSolver:function(U,W){var R=this.body1;var ad=this.body2;this.maxImpulse=this.maxForce*U;var ab=2*w.PI*this.frequencyHz;var V=ad.m*(ab*ab);var X=ad.m*2*this.dampingRatio*ab;this.gamma=(X+V*U)*U;this.gamma=this.gamma===0?0:1/this.gamma;var ac=U*V*this.gamma;this.r2=ad.xf.rotate(K.sub(this.anchor2,ad.centroid));var T=this.r2;var aa=T.y*ad.i_inv;var S=ad.m_inv+T.y*aa+this.gamma;var Q=-T.x*aa;var Z=ad.m_inv+T.x*T.x*ad.i_inv+this.gamma;this.em_inv=new (k)(S,Q,Q,Z);var Y=K.sub(K.add(ad.p,this.r2),R.p);this.beta_c=K.scale(Y,ac);ad.w*=0.98;if(W){ad.v.mad(this.lambda_acc,ad.m_inv);ad.w+=K.cross(this.r2,this.lambda_acc)*ad.i_inv;}else{this.lambda_acc.set(0,0);}},solveVelocityConstraints:function(){var T=this.body2;var S=K.mad(T.v,K.perp(this.r2),T.w);var R=K.mad(this.beta_c,this.lambda_acc,this.gamma);var Q=this.em_inv.solve(K.add(S,R).neg());var V=this.lambda_acc.duplicate();this.lambda_acc.addself(Q);var U=this.lambda_acc.lengthsq();if(U>this.maxImpulse*this.maxImpulse){this.lambda_acc.scale(this.maxImpulse/w.sqrt(U));}Q=K.sub(this.lambda_acc,V);T.v.mad(Q,T.m_inv);T.w+=K.cross(this.r2,Q)*T.i_inv;},solvePositionConstraints:function(){return true;},getReactionForce:function(Q){return K.scale(this.lambda_acc,Q);},getReactionTorque:function(Q){return 0;}};for(q in N){G.prototype[q]=N[q];}this.MouseJoint=G;j=function(Q){if(arguments.length===0){return;}if(j.id_counter===undefined){j.id_counter=0;}this.id=j.id_counter++;this.type=Q;this.e=0;this.u=1;this.density=1;this.bounds=new (g)();};j.TYPE_CIRCLE=0;j.TYPE_SEGMENT=1;j.TYPE_POLY=2;j.NUM_TYPES=3;var b=function(S,R,Q){j.call(this,j.TYPE_CIRCLE);this.c=new (K)(S||0,R||0);this.r=Q;this.tc=K.zero;this.finishVerts();};b.prototype=new (j)();b.prototype.constructor=b;N={finishVerts:function(){this.r=w.abs(this.r);},duplicate:function(){return new (b)(this.c.x,this.c.y,this.r);},recenter:function(Q){this.c.subself(Q);},transform:function(Q){this.c=Q.transform(this.c);},untransform:function(Q){this.c=Q.untransform(this.c);},area:function(){return s(this.r,0);},centroid:function(){return this.c.duplicate();},inertia:function(Q){return J(Q,this.c,this.r,0);},cacheData:function(Q){this.tc=Q.transform(this.c);this.bounds.mins.set(this.tc.x-this.r,this.tc.y-this.r);this.bounds.maxs.set(this.tc.x+this.r,this.tc.y+this.r);},pointQuery:function(Q){return K.distsq(this.tc,Q)<(this.r*this.r);},findVertexByPoint:function(S,R){var Q=R*R;if(K.distsq(this.tc,S)<Q){return 0;}return -1;},distanceOnPlane:function(R,Q){return K.dot(R,this.tc)-this.r-Q;}};for(q in N){b.prototype[q]=N[q];}this.ShapeCircle=b;var P=function(S,R,Q){j.call(this,j.TYPE_SEGMENT);this.a=S.duplicate();this.b=R.duplicate();this.r=Q;this.n=K.perp(K.sub(R,S));this.n.normalize();this.ta=K.zero;this.tb=K.zero;this.tn=K.zero;this.finishVerts();};P.prototype=new (j)();P.prototype.constructor=P;N={finishVerts:function(){this.n=K.perp(K.sub(this.b,this.a));this.n.normalize();this.r=w.abs(this.r);},duplicate:function(){return new (P)(this.a,this.b,this.r);},recenter:function(Q){this.a.subself(Q);this.b.subself(Q);},transform:function(Q){this.a=Q.transform(this.a);this.b=Q.transform(this.b);},untransform:function(Q){this.a=Q.untransform(this.a);this.b=Q.untransform(this.b);},area:function(){return o(this.a,this.b,this.r);},centroid:function(){return A(this.a,this.b);},inertia:function(Q){return x(Q,this.a,this.b);},cacheData:function(T){this.ta=T.transform(this.a);this.tb=T.transform(this.b);this.tn=K.perp(K.sub(this.tb,this.ta)).normalize();var R,U,Q,S;if(this.ta.x<this.tb.x){R=this.ta.x;U=this.tb.x;}else{R=this.tb.x;U=this.ta.x;}if(this.ta.y<this.tb.y){Q=this.ta.y;S=this.tb.y;}else{Q=this.tb.y;S=this.ta.y;}this.bounds.mins.set(R-this.r,Q-this.r);this.bounds.maxs.set(U+this.r,S+this.r);},pointQuery:function(T){if(!this.bounds.containPoint(T)){return false;}var Q=K.dot(this.tn,T)-K.dot(this.ta,this.tn);var V=w.abs(Q);if(V>this.r){return false;}var R=K.cross(T,this.tn);var U=K.cross(this.ta,this.tn);var S=K.cross(this.tb,this.tn);if(R<=U){if(R<U-this.r){return false;}return K.distsq(this.ta,T)<(this.r*this.r);}else{if(R>S){if(R>S+this.r){return false;}return K.distsq(this.tb,T)<(this.r*this.r);}}return true;},findVertexByPoint:function(S,R){var Q=R*R;if(K.distsq(this.ta,S)<Q){return 0;}if(K.distsq(this.tb,S)<Q){return 1;}return -1;},distanceOnPlane:function(T,S){var R=K.dot(T,this.ta)-this.r;var Q=K.dot(T,this.tb)-this.r;return w.min(R,Q)-S;}};for(q in N){P.prototype[q]=N[q];}this.ShapeSegment=P;var u=function(R){j.call(this,j.TYPE_POLY);this.verts=[];this.planes=[];this.tverts=[];this.tplanes=[];if(R){for(var Q=0;Q<R.length;Q++){this.verts[Q]=R[Q].duplicate();this.tverts[Q]=this.verts[Q];this.tplanes[Q]={};this.tplanes[Q].n=K.zero;this.tplanes[Q].d=0;}}this.finishVerts();};u.prototype=new (j)();u.prototype.constructor=u;N={finishVerts:function(){if(this.verts.length<2){this.convexity=false;this.planes=[];return;}this.convexity=true;this.tverts=[];this.tplanes=[];for(var S=0;S<this.verts.length;S++){var R=this.verts[S];var Q=this.verts[(S+1)%this.verts.length];var U=K.normalize(K.perp(K.sub(R,Q)));this.planes[S]={};this.planes[S].n=U;this.planes[S].d=K.dot(U,R);this.tverts[S]=this.verts[S];this.tplanes[S]={};this.tplanes[S].n=K.zero;this.tplanes[S].d=0;}for(var S=0;S<this.verts.length;S++){var Q=this.verts[(S+2)%this.verts.length];var U=this.planes[S].n;var T=this.planes[S].d;if(K.dot(U,Q)-T>0){this.convexity=false;}}},duplicate:function(){return new (u)(this.verts);},recenter:function(R){for(var Q=0;Q<this.verts.length;Q++){this.verts[Q].subself(R);}},transform:function(R){for(var Q=0;Q<this.verts.length;Q++){this.verts[Q]=R.transform(this.verts[Q]);}},untransform:function(R){for(var Q=0;Q<this.verts.length;Q++){this.verts[Q]=R.untransform(this.verts[Q]);}},area:function(){return v(this.verts);},centroid:function(){return O(this.verts);},inertia:function(Q){return d(Q,this.verts,K.zero);},cacheData:function(U){this.bounds.clear();var S=this.verts.length;if(S===0){return;}for(var T=0;T<S;T++){this.tverts[T]=U.transform(this.verts[T]);}if(S<2){this.bounds.addPoint(this.tverts[0]);return;}for(var T=0;T<S;T++){var R=this.tverts[T];var Q=this.tverts[(T+1)%S];var V=K.normalize(K.perp(K.sub(R,Q)));this.tplanes[T].n=V;this.tplanes[T].d=K.dot(V,R);this.bounds.addPoint(R);}},pointQuery:function(Q){if(!this.bounds.containPoint(Q)){return false;}return this.containPoint(Q);},findVertexByPoint:function(T,R){var Q=R*R;for(var S=0;S<this.tverts.length;S++){if(K.distsq(this.tverts[S],T)<Q){return S;}}return -1;},findEdgeByPoint:function(Q,X){var Y=X*X;var Z=this.tverts.length;for(var T=0;T<this.tverts.length;T++){var W=this.tverts[T];var V=this.tverts[(T+1)%Z];var S=this.tplanes[T].n;var ab=K.cross(W,S);var aa=K.cross(V,S);var R=K.cross(Q,S);if(R>ab){if(K.distsq(W,Q)<Y){return T;}}else{if(R<aa){if(K.distsq(V,Q)<Y){return T;}}else{var U=K.dot(S,Q)-K.dot(S,W);if(U*U<Y){return T;}}}}return -1;},distanceOnPlane:function(T,S){var R=999999;for(var Q=0;Q<this.verts.length;Q++){R=w.min(R,K.dot(T,this.tverts[Q]));}return R-S;},containPoint:function(S){for(var R=0;R<this.verts.length;R++){var Q=this.tplanes[R];if(K.dot(Q.n,S)-Q.d>0){return false;}}return true;},containPointPartial:function(S,T){for(var R=0;R<this.verts.length;R++){var Q=this.tplanes[R];if(K.dot(Q.n,T)<0.0001){continue;}if(K.dot(Q.n,S)-Q.d>0){return false;}}return true;}};for(q in N){u.prototype[q]=N[q];}this.ShapePoly=u;var p=function(S,R,Q){var T=[new (K)(S.x,S.y),new (K)(R.x,R.y),new (K)(Q.x,Q.y)];u.call(this,T);};p.prototype=u.prototype;this.ShapeTriangle=p;var z=function(V,T,R,U){V=V||0;T=T||0;var Q=R*0.5;var S=U*0.5;var W=[new (K)(-Q+V,+S+T),new (K)(-Q+V,-S+T),new (K)(+Q+V,-S+T),new (K)(+Q+V,+S+T)];u.call(this,W);this.w=R;this.h=U;};z.prototype=u.prototype;this.ShapeBox=z;n=function(R,T,S,Q){this.hash=Q;this.p=R;this.n=T;this.d=S;this.lambda_n_acc=0;this.lambda_t_acc=0;};this.Contact=n;var m=function(R,Q){this.shape1=R;this.shape2=Q;this.contactArr=[];this.e=1;this.u=1;};m.COLLISION_SLOP=0.0008;m.BAUMGARTE=0.28;m.MAX_LINEAR_CORRECTION=1;m.prototype={update:function(U){for(var S=0;S<U.length;S++){var T=U[S];var Q=-1;for(var R=0;R<this.contactArr.length;R++){if(T.hash===this.contactArr[R].hash){Q=R;break;}}if(Q>-1){T.lambda_n_acc=this.contactArr[Q].lambda_n_acc;T.lambda_t_acc=this.contactArr[Q].lambda_t_acc;}}this.contactArr=U;},initSolver:function(V){var Q=this.shape1.body;var ag=this.shape2.body;var S=Q.m_inv+ag.m_inv;for(var X=0;X<this.contactArr.length;X++){var R=this.contactArr[X];R.r1=K.sub(R.p,Q.p);R.r2=K.sub(R.p,ag.p);R.r1_local=Q.xf.unrotate(R.r1);R.r2_local=ag.xf.unrotate(R.r2);var U=R.n;var af=K.perp(R.n);var ab=K.cross(R.r1,U);var aa=K.cross(R.r2,U);var W=S+Q.i_inv*ab*ab+ag.i_inv*aa*aa;R.emn=W===0?0:1/W;var Z=K.cross(R.r1,af);var Y=K.cross(R.r2,af);var ae=S+Q.i_inv*Z*Z+ag.i_inv*Y*Y;R.emt=ae===0?0:1/ae;var ad=K.mad(Q.v,K.perp(R.r1),Q.w);var ac=K.mad(ag.v,K.perp(R.r2),ag.w);var T=K.sub(ac,ad);R.bounce=K.dot(T,R.n)*this.e;}},warmStart:function(){var T=this.shape1.body;var S=this.shape2.body;for(var U=0;U<this.contactArr.length;U++){var R=this.contactArr[U];var X=R.n;var V=R.lambda_n_acc;var Q=R.lambda_t_acc;var W=new (K)(V*X.x-Q*X.y,Q*X.x+V*X.y);T.v.mad(W,-T.m_inv);T.w-=K.cross(R.r1,W)*T.i_inv;S.v.mad(W,S.m_inv);S.w+=K.cross(R.r2,W)*S.i_inv;}},solveVelocityConstraints:function(){var ab=this.shape1.body;var aa=this.shape2.body;var ag=ab.m_inv;var V=ab.i_inv;var Z=aa.m_inv;var aj=aa.i_inv;for(var ah=0;ah<this.contactArr.length;ah++){var U=this.contactArr[ah];var ad=U.n;var ac=K.perp(ad);var ai=U.r1;var af=U.r2;var T=K.mad(ab.v,K.perp(ai),ab.w);var S=K.mad(aa.v,K.perp(af),aa.w);var W=K.sub(S,T);var R=-U.emn*(K.dot(ad,W)+U.bounce);var X=U.lambda_n_acc;U.lambda_n_acc=w.max(X+R,0);R=U.lambda_n_acc-X;var ak=-U.emt*K.dot(ac,W);var ae=U.lambda_n_acc*this.u;var Q=U.lambda_t_acc;U.lambda_t_acc=w.clamp(Q+ak,-ae,ae);ak=U.lambda_t_acc-Q;var Y=new (K)(R*ad.x-ak*ad.y,ak*ad.x+R*ad.y);ab.v.mad(Y,-ag);ab.w-=K.cross(ai,Y)*V;aa.v.mad(Y,Z);aa.w+=K.cross(af,Y)*aj;}},solvePositionConstraints:function(){var Z=this.shape1.body;var Y=this.shape2.body;var ah=Z.m_inv;var W=Z.i_inv;var X=Y.m_inv;var ak=Y.i_inv;var U=ah+X;var R=0;for(var ai=0;ai<this.contactArr.length;ai++){var V=this.contactArr[ai];var ad=V.n;var aj=K.rotate(V.r1_local,Z.a);var af=K.rotate(V.r2_local,Y.a);var T=K.add(Z.p,aj);var S=K.add(Y.p,af);var ac=K.sub(S,T);var al=K.dot(ac,ad)+V.d;var ae=w.clamp(m.BAUMGARTE*(al+m.COLLISION_SLOP),-m.MAX_LINEAR_CORRECTION,0);if(ae===0){continue;}R=w.max(R,-al);var Q=K.cross(aj,ad);var am=K.cross(af,ad);var ag=U+Z.i_inv*Q*Q+Y.i_inv*am*am;var aa=ag===0?0:-ae/ag;var ab=K.scale(ad,aa);Z.p.mad(ab,-ah);Z.a-=Q*aa*W;Y.p.mad(ab,X);Y.a+=am*aa*ak;}return R<=m.COLLISION_SLOP*3;}};this.ContactSolver=m;var B=function(){this.bodyArr=[];this.bodyHash={};this.jointArr=[];this.jointHash={};this.numContacts=0;this.contactSolverArr=[];this.postSolve=function(Q){};this.gravity=new (K)(0,0);this.damping=0;};B.TIME_TO_SLEEP=0.5;B.SLEEP_LINEAR_TOLERANCE=0.5;B.SLEEP_ANGULAR_TOLERANCE=D(2);B.prototype={clear:function(){j.id_counter=0;t.id_counter=0;c.id_counter=0;for(var Q=0;Q<this.bodyArr.length;Q++){if(this.bodyArr[Q]){this.removeBody(this.bodyArr[Q]);}}this.bodyArr=[];this.bodyHash={};this.jointArr=[];this.jointHash={};this.contactSolverArr=[];this.stepCount=0;},addBody:function(Q){if(this.bodyHash[Q.id]!==undefined){return;}var R=this.bodyArr.push(Q)-1;this.bodyHash[Q.id]=R;Q.awake(true);Q.space=this;Q.cacheData();},removeBody:function(Q){if(this.bodyHash[Q.id]===undefined){return;}for(var S=0;S<Q.jointArr.length;S++){if(Q.jointArr[S]){this.removeJoint(Q.jointArr[S]);}}Q.space=null;var R=this.bodyHash[Q.id];delete this.bodyHash[Q.id];delete this.bodyArr[R];},addJoint:function(R){if(this.jointHash[R.id]!==undefined){return;}R.body1.awake(true);R.body2.awake(true);var Q=this.jointArr.push(R)-1;this.jointHash[R.id]=Q;var Q=R.body1.jointArr.push(R)-1;R.body1.jointHash[R.id]=Q;var Q=R.body2.jointArr.push(R)-1;R.body2.jointHash[R.id]=Q;},removeJoint:function(R){if(this.jointHash[R.id]===undefined){return;}R.body1.awake(true);R.body2.awake(true);var Q=R.body1.jointHash[R.id];delete R.body1.jointHash[R.id];delete R.body1.jointArr[Q];var Q=R.body2.jointHash[R.id];delete R.body2.jointHash[R.id];delete R.body2.jointArr[Q];var Q=this.jointHash[R.id];delete this.jointHash[R.id];delete this.jointArr[Q];},findShapeByPoint:function(W,V){var R;for(var U=0;U<this.bodyArr.length;U++){var Q=this.bodyArr[U];if(!Q){continue;}for(var T=0;T<Q.shapeArr.length;T++){var S=Q.shapeArr[T];if(S.pointQuery(W)){if(!V){return S;}if(!R){R=S;}if(S===V){V=null;}}}}return R;},findBodyByPoint:function(W,V){var S;for(var U=0;U<this.bodyArr.length;U++){var Q=this.bodyArr[U];if(!Q){continue;}for(var T=0;T<Q.shapeArr.length;T++){var R=Q.shapeArr[T];if(R.pointQuery(W)){if(!V){return R.body;}if(!S){S=R.body;}if(R.body===V){V=null;}break;}}}return S;},shapeById:function(U){var R;for(var T=0;T<this.bodyArr.length;T++){var Q=this.bodyArr[T];if(!Q){continue;}for(var S=0;S<Q.shapeArr.length;S++){if(Q.shapeArr[S].id===U){return Q.shapeArr[S];}}}return null;},jointById:function(R){var Q=this.jointHash[R];if(Q!==undefined){return this.jointArr[Q];}return null;},findVertexByPoint:function(Q,Y,Z){var X=-1;Z=Z||-1;for(var S=0;S<this.bodyArr.length;S++){var U=this.bodyArr[S];if(!U){continue;}for(var R=0;R<U.shapeArr.length;R++){var W=U.shapeArr[R];var V=W.findVertexByPoint(Q,Y);if(V!==-1){var T=(W.id<<16)|V;if(Z===-1){return T;}if(X===-1){X=T;}if(T===Z){Z=-1;}}}}return X;},findEdgeByPoint:function(Q,Y,S){var Z=-1;S=S||-1;for(var U=0;U<this.bodyArr.length;U++){var V=this.bodyArr[U];if(!V){continue;}for(var T=0;T<V.shapeArr.length;T++){var X=V.shapeArr[T];if(X.type!==j.TYPE_POLY){continue;}var W=X.findEdgeByPoint(Q,Y);if(W!==-1){var R=(X.id<<16)|W;if(S===-1){return R;}if(Z===-1){Z=R;}if(R===S){S=-1;}}}}return Z;},findJointByPoint:function(X,S,Q){var V=-1;var R=S*S;Q=Q||-1;for(var T=0;T<this.jointArr.length;T++){var W=this.jointArr[T];if(!W){continue;}var U=-1;if(K.distsq(X,W.getWorldAnchor1())<R){U=(W.id<<16|0);}else{if(K.distsq(X,W.getWorldAnchor2())<R){U=(W.id<<16|1);}}if(U!==-1){if(Q===-1){return U;}if(V===-1){V=U;}if(U===Q){Q=-1;}}}return V;},findContactSolver:function(S,Q){for(var T=0;T<this.contactSolverArr.length;T++){var R=this.contactSolverArr[T];if(S===R.shape1&&Q===R.shape2){return R;}}return null;},genTemporalContactSolvers:function(){var Y=C();var T=[];this.numContacts=0;for(var Z=0;Z<this.bodyArr.length;Z++){var Q=this.bodyArr[Z];if(!Q){continue;}Q.stepCount=this.stepCount;for(var R=0;R<this.bodyArr.length;R++){var af=this.bodyArr[R];if(!af){continue;}if(Q.stepCount===af.stepCount){continue;}var ac=Q.isAwake()&&!Q.isStatic();var aa=af.isAwake()&&!af.isStatic();if(!ac&&!aa){continue;}if(!Q.isCollidable(af)){continue;}if(!Q.bounds.intersectsBounds(af.bounds)){continue;}for(var W=0;W<Q.shapeArr.length;W++){for(var V=0;V<af.shapeArr.length;V++){var ae=Q.shapeArr[W];var ad=af.shapeArr[V];var U=[];if(!l.collide(ae,ad,U)){continue;}if(ae.type>ad.type){var ab=ae;ae=ad;ad=ab;}this.numContacts+=U.length;var S=this.findContactSolver(ae,ad);if(S){S.update(U);T.push(S);}else{Q.awake(true);af.awake(true);var X=new (m)(ae,ad);X.contactArr=U;X.e=w.max(ae.e,ad.e);X.u=w.sqrt(ae.u*ad.u);T.push(X);}}}}}return T;},initSolver:function(S,R,U){var T=C();for(var Q=0;Q<this.contactSolverArr.length;Q++){this.contactSolverArr[Q].initSolver(R);}for(var Q=0;Q<this.jointArr.length;Q++){if(this.jointArr[Q]){this.jointArr[Q].initSolver(S,U);}}if(U){for(var Q=0;Q<this.contactSolverArr.length;Q++){this.contactSolverArr[Q].warmStart();}}},velocitySolver:function(S){var T=C();for(var R=0;R<S;R++){for(var Q=0;Q<this.jointArr.length;Q++){if(this.jointArr[Q]){this.jointArr[Q].solveVelocityConstraints();}}for(var Q=0;Q<this.contactSolverArr.length;Q++){this.contactSolverArr[Q].solveVelocityConstraints();}}},positionSolver:function(Q){var U=C();var X=false;for(var S=0;S<Q;S++){var V=true;var T=true;for(var R=0;R<this.contactSolverArr.length;R++){var Y=this.contactSolverArr[R].solvePositionConstraints();V=Y&&V;}for(var R=0;R<this.jointArr.length;R++){if(this.jointArr[R]){var W=this.jointArr[R].solvePositionConstraints();T=W&&T;}}if(V&&T){X=true;break;}}return X;},step:function(ac,ab,af,X,S){var ag=1/ac;this.stepCount++;this.contactSolverArr=this.genTemporalContactSolvers();this.initSolver(ac,ag,X);for(var ae=0;ae<this.bodyArr.length;ae++){var Z=this.bodyArr[ae];if(!Z){continue;}if(Z.isDynamic()&&Z.isAwake()){Z.updateVelocity(this.gravity,ac,this.damping);}}for(var ae=0;ae<this.jointArr.length;ae++){var ah=this.jointArr[ae];if(!ah){continue;}var aa=ah.body1;var Y=ah.body2;var U=aa.isAwake()&&!aa.isStatic();var T=Y.isAwake()&&!Y.isStatic();if(U^T){if(!U){aa.awake(true);}if(!T){Y.awake(true);}}}this.velocitySolver(ab);for(var ae=0;ae<this.bodyArr.length;ae++){var Z=this.bodyArr[ae];if(!Z){continue;}if(Z.isDynamic()&&Z.isAwake()){Z.updatePosition(ac);}}for(var ae=0;ae<this.jointArr.length;ae++){var ah=this.jointArr[ae];if(!ah){continue;}if(ah.breakable){if(ah.getReactionForce(ag).lengthsq()>=ah.maxForce*ah.maxForce){this.removeJoint(ah);}}}var V=this.positionSolver(af);for(var ae=0;ae<this.bodyArr.length;ae++){var Z=this.bodyArr[ae];if(!Z){continue;}Z.syncTransform();}for(var ae=0;ae<this.contactSolverArr.length;ae++){var W=this.contactSolverArr[ae];this.postSolve(W);}for(var ae=0;ae<this.bodyArr.length;ae++){var Z=this.bodyArr[ae];if(!Z){continue;}if(Z.isDynamic()&&Z.isAwake()){Z.cacheData();}}if(S){var ad=999999;var Q=B.SLEEP_LINEAR_TOLERANCE*B.SLEEP_LINEAR_TOLERANCE;var R=B.SLEEP_ANGULAR_TOLERANCE*B.SLEEP_ANGULAR_TOLERANCE;for(var ae=0;ae<this.bodyArr.length;ae++){var Z=this.bodyArr[ae];if(!Z){continue;}if(!Z.isDynamic()){continue;}if(Z.w*Z.w>R||Z.v.dot(Z.v)>Q){Z.sleepTime=0;ad=0;}else{Z.sleepTime+=ac;ad=w.min(ad,Z.sleepTime);}}if(V&&ad>=B.TIME_TO_SLEEP){for(var ae=0;ae<this.bodyArr.length;ae++){var Z=this.bodyArr[ae];if(!Z){continue;}Z.awake(false);}}}}};this.Space=B;};return new (a)();})();

/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                  End Physics R Us Engine                   *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/



/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                         Characters                         *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var drawCharacter = function(id, x, y, sz, ang){
    //To shorten character drawing code
    var
    a = arc,            b = bezierVertex,   e = endShape,
    f = fill,           F = noFill,         g = rotate,
    l = line,           n = noStroke,       p = ellipse,
    P = point,          q = quad,           r = rect,
    s = stroke,         S = beginShape,     t = triangle,
    W = strokeWeight,   v = vertex,         z = bezier,
    u = translate;
    
    pushMatrix();
    translate(x, y);
    rotate(-ang);
    
    switch(id){
        case "red": case "r":
            scale(sz*0.003955696202531646,sz*0.003955696202531646);W(2);s(0);f(0);S();v(52,-99);b(29,-152,-6,-153,-15,-152);b(-29,-149,-33,-135,-27,-126);b(-49,-133,-107,-109,-50,-94);b(-87,-82,-166,47,-77,104);b(-9,142,82,136,119,76);b(163,-3,95,-88,52,-99);e();s(16);f(16);S();v(-111,-12);v(-122,-35);v(-135,-23);b(-112,1,-130,-19,-114,-4);v(-149,-19);v(-157,-2);b(-138,5,-128,5,-116,6);e();S();v(-117,7);b(-110,10,-123,4,-139,13);v(-135,25);v(-117,14);e();f(252,17,84);s(252,17,84);S();v(95,91);b(156,38,120,-63,52,-91);b(34,-135,5,-146,-9,-147);b(-2,-147,-63,-139,27,-100);v(0,-106);b(-7,-110,-14,-114,-20,-120);b(-41,-132,-83,-114,-61,-104);b(-40,-98,-40,-98,-11,-99);e();f(211,10,50);s(211,10,50);S();v(-20,-120);b(-34,-125,-61,-111,-61,-104);b(-40,-98,-40,-98,-11,-99);v(-35,-94);b(-65,-91,-153,19,-90,82);b(-25,138,65,121,95,91);b(153,42,125,-46,41,-84);b(32,-161,-83,-146,27,-100);v(0,-106);b(-7,-110,-14,-114,-20,-120);e();f(226,196,168);W(1.7);s(226,196,168);S();v(-75,93);b(-90,87,39,6,87,97.8);b(51,121,-16,133,-75,93);e();f(168,0,35);s(168,0,35);S();v(-63,31);b(-55,30,-42,56,-60,57);b(-72,55,-76,32,-63,31);e();S();v(-33,8.4);b(-16,12,-16,54,-30,51);b(-40,57,-50,22,-33,8.4);e();S();v(10,-5);b(-9,7,-21,49,5,53);b(40,57,55,22,10,-5);e();S();v(102,-2);b(52,25,78,51,104,47);b(111,49,128,25,102,-2);e();W(4);f(0);s(0);z(12,-5,7,0,-1,11,9,32);l(9,24,12,28);z(103,19,101,18,106,8,97,0);f(219);s(219);W(1);z(13,-2,9,-3,1,16,13,27);t(13,20,13,27,20,25);f(255);s(255);z(13,-2,16,-2,3,16,20,25);z(95,0,100,5,102,15,100,19);q(13,-2,20,25,100,19,95,0);t(18,24,83,19,61,29);f(0);s(0);p(34.5,15,14,12);p(70,15,9,9);f(0);s(0);S();v(60,11);b(30,2,8,-4,-7,-15);b(-8,-19,-2,-28,7,-36);b(28,-19,44,-11,61,-1);b(79,-8,88,-15,105,-30);b(112,-24,119,-7,117,-11);b(83,7,84,4,60,11);e();W(4);f(168,0,35);z(6,33,26,24,35,28,44,29);z(106,21,85,15,80,23,73,26);W(1);s(0);f(0);t(59,2,57,24,61,24);f(255);W(4);s(0);S();v(59,24);b(24,37,6,62,24,77);v(44,77);e();f(251,186,30);S();v(59,24);b(31,38,-11,62,61,67);b(74,70,91,68,108,84);b(117,96,117,38,59,24);e();f(245,156,30);s(0);W(4);S();v(25,77);b(35,87,40,89,56,97);b(76,87,73,89,90,75);b(99,71,40,60,24,77);e();
            break;
        case "yellow": case "y":
            scale(sz*0.0045016077170418,sz*0.0045016077170418);f(0);s(0);W(1);S();v(10,-124);b(49,-96,152,50,144,78);b(154,108,-119,119,-137,80);b(-139,74,-126,37,-121,30);b(-133,34,-145,34,-156,27);b(-139,24,-141,21,-136,16);b(-147,10,-168,-7,-151,-42);b(-149,-17,-145,-16,-125,2);b(-129,-8,-124,-21,-110,-33);b(-115,-16,-114,-12,-104,-1);b(-98,-8,-94,-34,-27,-117);b(-35,-121,-38,-120,-53,-117);b(-54,-122,-38,-132,-38,-131);b(-55,-135,-65,-137,-75,-135);b(-60,-150,-47,-148,-28,-146);b(-59,-173,-70,-169,-81,-171);b(-64,-181,-22,-178,-2,-155);b(-1,-164,0,-172,0,-178);b(12,-165,21,-142,10,-124);e();f(246,223,53);s(0);S();v(-5,-121);b(15,-116,112,-15,134,69);b(133,82,128,77,126,81);b(133,82,33,39,-53,96);b(-57,96,-92,97,-127,76);b(-120,20,-24,-123,-5,-121);e();f(255);n();S();v(126,79);b(133,81,33,38,-54.2,95.2);b(33,102,123,86,126,79);e();f(0);s(0);p(4,22,54,45);f(255);p(4,22,48,38);n();f(0);p(18.5,22.5,13,11);f(0);s(0);p(86,23,44,37);f(255);p(86,23,39,31);n();f(0);p(97.5,24,11,9);f(176,52,18);s(176,52,18);W(2);q(-40,-24,41,6,37,17,-50,-7);q(58,8,131,-12,136,2,60,18);f(244,169,42);s(0);W(5);S();v(20,55);b(27,43,41,29,51,23);b(82,29,102,38,120,55);b(108,57,102,53,92,53);b(63,50,37,38,20,55);e();S();v(92,53);b(63,49,40,39,20,55);b(28,64,42,71,56,74);b(70,67,80,63,94,53);e();
            break;
        case "blue": case "b":
            scale(sz*0.003,sz*0.003);translate(-200,-200);W(1);s(0);f(0);q(265,101,215,336,161,95,196,66);t(196,66,241,72,258,98);q(318,208,328,221,334,234,314,231);q(85,221,49,206,43,229,95,233);q(82,232,51,258,68,266,89,240);W(2);z(196,66,200,56,220,41,241,72);F();z(241,72,250,83,257,98,265,101);f(0);z(265,101,326,143,359,306,215,336);z(215,336,74,344,35,169,161,95);z(161,95,147,68,172,58,196,66);z(85,221,60,204,55,210,49,206);l(49,206,43,229);l(43,229,82,232);z(82,232,72,239,62,246,51,258);l(51,258,68,266);l(68,266,89,240);W(1);f(102,169,195);s(102,169,195);q(253,101,208,323,163,106,199,102);q(199,102,181,95,227,99,253,101);t(227,99,207,63,253,101);z(227,99,194,70,205,65,207,63);z(207,63,222,54,239,78,253,101);z(253,101,353,192,304,320,208,323);z(208,323,68,327,65,153,163,106);z(163,106,170,100,191,104,199,102);f(0);z(199,102,202,104,191,97,181,95);f(102,169,195);z(181,95,140,75,191,63,227,99);W(7);f(0);s(0);q(296,147,155,171,172,211,309,227);t(172,211,224,257,305,226);z(299,173,308,125,232,115,237,166);z(228,166,240,124,155,105,155,171);z(155,171,151,184,155,195,172,211);z(172,211,182,224,195,243,224,259);z(224,259,242,256,275,242,305,226);W(1);f(255);s(255);z(159,171,159,121,218,116,227,164);z(159,171,209,189,218,173,227,164);W(2);l(162,171,224,164);W(1);z(241,166,245,119,297,134,294,172);z(241,166,241,169,241,170,294,172);l(241,166,294,172);f(0);s(0);p(216,159,15,15);p(280,159,15,15);f(204,79,48);s(204,79,48);t(154,177,174,207,196,187);z(154,177,153,189,160,196,174,207);f(158,61,42);s(158,61,42);t(299,182,277,179,301,194);z(299,182,297,181,293,178,277,179);z(277,179,291,189,290,190,301,194);f(252,172,47);s(252,172,47);z(178,213,233,166,231,147,325,225);f(0);s(0);z(178,214,233,212,280,218,325,226);f(252,172,47);s(252,172,47);t(184,222,296,229,220,255);z(184,222,233,222,231,218,296,229);z(296,229,263,248,239,250,220,255);z(220,255,211,248,193,235,184,222);
            break;
        case "king": case "k":
            scale(sz * 0.006,sz * 0.006);translate(-200,-200);f(254,232,52);s(0);W(2.4);S();v(238,140);v(203,134);b(213,90,213,78,212,43);v(233,84);v(253,61);v(257,90);e();f(250,212,49);S();v(256,90);b(266,85,277,79,301,72);b(263,97,261,132,255,148);v(237,140);e();f(37,131,236);n();S();v(210,100);b(215,104,214,108,208,114);b(202,110,202,103,210,100);e();p(238,111.5,16,17);S();v(266,114);b(271,116,269,128,262,126);b(259,128,257,116,266,114);e();f(195,255,254);p(210,105.6,3,3);p(241.1,108.5,3,3);p(266.8,119.7,3,3);F();s(0);W(2.4);a(210,107,14,14,-244,-92);a(263,120,14,14,-63,97);f(116,225,84);s(0);W(5);S();v(191,134);b(302,132,326,220,318,261);b(304,341,211,340,191,340);b(48,334,59,224,99,179);b(118,153,148,132,191,134);e();S();v(104,178);b(92,175,70,165,83,144);b(101,126,115,147,118,163);e();S();v(160,140);b(156,138,139,103,168,96);b(186,93,195,113,189,137);e();f(20,57,15);n();S();v(107,168);b(114,162,107,139,93,151);b(90,153,86,169,107,168);e();S();v(173,136);b(165,133,156,117,173,114);b(186,114,184,133,173,136);e();f(48,97,29);n();S();v(96,197);b(97,186,116,177,124,197);b(108,188,105,193,96,197);e();S();v(254,181);b(263,156,283,175,282,176);b(288,183,271,167,254,181);e();f(90,179,60);n();p(110.5,255,45,39);p(283.5,243,45,39);p(196,272,83,77);f(255);s(104,154,30);W(5);p(106.8,235,56,58);p(286,220,56,56);f(143,204,39);z(158,268,183,300,210,300,235,268);f(167,231,46);S();v(196.5,170);b(247,170,293,241,235,268);b(210,275,183,275,158,268);b(101,239,151,170,196.5,170);e();f(21,26,18);n();S();v(189,212);b(202,249,174,253,163,229);b(153,200,179,205,189,212);e();S();v(209,216);b(212,206,233,203,234,219);b(223,246,209,244,209,216);e();f(0);n();p(94.9,237,14,14);p(296,221.3,14,14);
            break;
    }
    
    popMatrix();
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                      Button Functions                      *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var mouseOverRect = function(x, y, w, h){
    return mouseX > x && mouseY > y &&
           mouseX < x + w && mouseY < y + h;
};

var buttons = [];

var clearButtons = function(){
    buttons = [];
};

var button = function(x, y, w, h, t, tS, f, s, tF, mOF, mOTF){
    //Set optional parameters if unspecified
    f = f ? f : color(227, 209, 48);
    s = s ? s : color(254, 255, 186);
    mOF = mOF ? mOF : color(255, 255, 255, 250);
    
    //Rect
    fill(mouseOverRect(x, y, w, h) ? mOF : f);
    stroke(s);
    strokeWeight(2);
    rectMode(CORNER);
    rect(x, y, w, h, 5);
    
    //Set optional parameters if unspecified
    tF = tF ? tF : color(255, 255, 255);
    mOTF = mOTF ? mOTF : color(0, 0, 0);
    
    //Text
    fill(mouseOverRect(x, y, w, h) ? mOTF : tF);
    stroke(mouseOverRect(x, y, w, h) ? mOTF : tF);
    textAlign(CENTER, CENTER);
    textSize(tS);
    text(t, x + w / 2, y + h / 2);
    
    //Submit a button only if not already
    var b = {x: x, y: y, w: w, h: h, t: t};
    var buttonAlreadyPushed = false;
    for(var i = 0; i < buttons.length; i++){
        if(b.x === buttons[i].x && b.y === buttons[i].y &&
        b.w === buttons[i].w && b.h === buttons[i].h &&
        b.t === buttons[i].t){
            buttonAlreadyPushed = true;
            break;
        }
    }
    if(!buttonAlreadyPushed){buttons.push(b);}
};

var btn = button;


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                           Space                            *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

// our space is 10 meters on a side, the coordinate
// system is cartesian, with 0,0 at center screen

var objToSpace = 1/40;
var spaceToObj = 40;    // 40*10 -> 400 (canvas size)

// convert space coordinates to scene coordinates
var ToScreen=function(v2){
    // don't change the original vector
    // (may be important), i.e. duplicate()
    // scale the coordinate to screen dimensions
    var resized=v2.duplicate().scale(spaceToObj);

    // convert scaled coordinate to screen coordinate
    resized.x+=200; resized.y=200-resized.y;
    return resized;
};
var ToWorld=function(x,y){
    // do the inverse of ToScreen()
    var cart=new (PRU.vec2)(x-200, 200-y);
    return cart.scale(objToSpace);
};

var levelSpace;

var levelSpaceSetup = function(){
    // create a physical space
    levelSpace = new (PRU.Space)();
    // set gravity
    levelSpace.gravity = new (PRU.vec2)(0,-10);
    
    // initialize collision detection
    PRU.Collision.init();
    
    // create walls (static, only do collisions, no motion)
    // (not visible, inside edge is edge of screen)
    var walls = new (PRU.Body)(PRU.Body.STATIC);
    var left = new (PRU.ShapeBox)(-5.5, 0, 1, 11);
        left.e = 0.6;
        left.u = 0.6;
    var right = new (PRU.ShapeBox)(5.5, 0, 1, 11);
        right.e = 0.6;
        right.u = 0.6;
    var top = new (PRU.ShapeBox)(0, 5.5, 11, 1);
        top.e = 0.6;
        top.u = 0.6;
    var bottom = new (PRU.ShapeBox)(0, -4.5, 11, 1);
        bottom.e = 0.6;
        bottom.u = 0.6;
    walls.addShape(left);
    walls.addShape(right);
    walls.addShape(top);
    walls.addShape(bottom);
    // recalculates object mass (not used here, but based
    // on the reference that I'm working from)
    walls.resetMassData();
    // add walls to scene
    levelSpace.addBody(walls);
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                           Cannon                           *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var cannon;
var cw;
var cannonBalls;
var cannonBallSpeed;

var cannonSetup = function(){
    cannon = {};
    cw = new (PRU.vec2)(-4,-4);
    cannon.screen = ToScreen(cw);
    cannon.world = cw;
    cannon.length = 50;   // pixels
    cannon.width = 14;
    
    cannonBalls = [];
    cannonBallSpeed = 10;   // meters/sec
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                           Blocks                           *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var staticBlocks;
var woodBlocks;
var glassBlocks;
var stoneBlocks;

var newBlock = function(type, x, y, w, h){
    var pos = new (PRU.vec2)(x, y);
    
    var block;
    if(type === 0 || type === "static" || type === "x"){
        block = new (PRU.Body)(PRU.Body.STATIC, pos, 0);
    }else{
        block = new (PRU.Body)(PRU.Body.DYNAMIC, pos, 0);
    }
    
    var shpe = new (PRU.ShapeBox)(0, 0, w, h);
    shpe.e = 0.6;         // elasticity
    shpe.u = 0.9;         // coef of friction
    shpe.density = 3.0;   // material density
    block.addShape(shpe);
    block.resetMassData();
    
    switch(type){
        case 0: case "static": case "x":
            staticBlocks.push(block);
            break;
        case 1: case "wood": case "w":
            woodBlocks.push(block);
            break;
        case 2: case "glass": case "g":
            glassBlocks.push(block);
            break;
        case 3: case "stone": case "s":
            stoneBlocks.push(block);
            break;
    }
    levelSpace.addBody(block);
};

var blocksSetup = function(){
    staticBlocks = [];
    woodBlocks = [];
    glassBlocks = [];
    stoneBlocks = [];
    
/************************************************************/
//       "Type"     X           Y           Width       Height
newBlock("static",  2,          -(3+3/4),   2 + 1/2,    1/2);
newBlock("wood",    13/16,      -(3+3/8),   1/8,        1/4);
newBlock("wood",    3+3/16,     -(3+3/8),   1/8,        1/4);
newBlock("wood",    2,          -(3+7/16),  1/2,        1/8);
newBlock("glass",   1+13/16,    -(3+1/8),   1/8,        1/2);
newBlock("glass",   2+3/16,     -(3+1/8),   1/8,        1/2);
newBlock("wood",    2,          -(2+13/16), 1/2,        1/8);
newBlock("wood",    1+9/16,     -3,         1/8,        1);
newBlock("wood",    2+7/16,     -3,         1/8,        1);
newBlock("wood",    2,          -(2+7/16),  1,          1/8);
newBlock("wood",    2,          -(2+3/8),   1/4,        1/8);
newBlock("wood",    1+3/4,      -(1+7/8),   1/8,        1);
newBlock("wood",    2+1/4,      -(1+7/8),   1/8,        1);
newBlock("wood",    2,          -(1+5/16),  1/2,        1/8);
newBlock("wood",    2,          -(1+1/8),   1/8,        1/4);
/************************************************************/
    
    //Test
    for(var i = 0; i < 50; i++){
        //newBlock("stone", random(-5, 5), random(-4, 5), 1/8, 1/4);
    }
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                         Level Setup                        *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var levelSetup = function(){
    levelSpaceSetup();
    cannonSetup();
    blocksSetup();
};

levelSetup();


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                        Block Drawing                       *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var drawBlock = function(b, bColor){
    var pos = ToScreen(b.p);  // the block's position
    var a = b.a;           // angle of rotation
    var s = b.shapeArr[0];  // reference to the shape
    var w = s.w * spaceToObj; // the block's width
    var h = s.h * spaceToObj; // & height scaled
    
    fill(bColor);
    noStroke();
    translate(pos.x, pos.y);
    rotate(-a);     // screen y is inverted so neg a
    rect(0, 0, w, h);
    resetMatrix();
};

var drawBlocks = function(){
    for(var i = 0; i < staticBlocks.length; i++){
        drawBlock(staticBlocks[i], color(51, 51, 51));
    }
    for(var i = 0; i < woodBlocks.length; i++){
        drawBlock(woodBlocks[i], color(225, 137, 54));
    }
    for(var i = 0; i < glassBlocks.length; i++){
        drawBlock(glassBlocks[i], color(170, 195, 198));
    }
    for(var i = 0; i < stoneBlocks.length; i++){
        drawBlock(stoneBlocks[i], color(161, 157, 152));
    }
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*              Cannon Functionality and Drawing              *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

// based on mouse direction and distance
var getCannonVelocity=function(){
    var mw = ToWorld(mouseX, mouseY);
    return mw.subself(cannon.world);
};

var getCannonDirection=function(){
    return getCannonVelocity().normalize();
};

var drawCannon = function(){
    var vel = getCannonVelocity();
    var angle = atan2(vel.y, vel.x);
    translate(cannon.screen.x, cannon.screen.y);
    // y is inverted so angle is negated
    rotate(-angle);
    fill(50);
    noStroke();
    ellipse(0,0,30,30);
    quad(0,-15,50,-7,50,7,0,15);
    resetMatrix();
    //fill(255, 0, 0);
    //text(angle,10,20);
};

// 32 sided regular polygon
var cCoords = [
    1,0,
    0.9807852804032304,0.19509032201612825,
    0.9238795325112867,0.3826834323650898,
    0.8314696123025452,0.5555702330196022,
    0.7071067811865475,0.7071067811865475,
    0.5555702330196022,0.8314696123025452,
    0.3826834323650898,0.9238795325112867,
    0.19509032201612825,0.9807852804032304,
    0,1,
    -0.1950903220161282,0.9807852804032304,
    -0.3826834323650897,0.9238795325112867,
    -0.5555702330196018,0.8314696123025455,
    -0.7071067811865474,0.7071067811865476,
    -0.8314696123025453,0.555570233019602,
    -0.9238795325112867,0.3826834323650898,
    -0.9807852804032303,0.19509032201612844,
    -1,0,
    -0.9807852804032304,-0.19509032201612836,
    -0.9238795325112867,-0.38268343236508967,
    -0.8314696123025455,-0.5555702330196018,
    -0.7071067811865476,-0.7071067811865474,
    -0.555570233019602,-0.8314696123025453,
    -0.38268343236509034,-0.9238795325112865,
    -0.19509032201612864,-0.9807852804032304,
    0,-1,
    0.19509032201612828,-0.9807852804032304,
    0.38268343236509006,-0.9238795325112866,
    0.5555702330196017,-0.8314696123025455,
    0.7071067811865474,-0.7071067811865476,
    0.8314696123025452,-0.5555702330196022,
    0.9238795325112865,-0.38268343236509034,
    0.9807852804032304,-0.19509032201612864,
];

var fireCannon=function(){
    var polyScale = cannon.width/2*objToSpace;
    var pVerts = [];
    var dir = getCannonDirection();
    // don't change the cannon's position!
    var pos = PRU.vec2.add(cannon.world, PRU.vec2.scale(dir, cannon.length/2*objToSpace));
    for(var i=0;i<cCoords.length;i+=2){
        var vert = new (PRU.vec2)(cCoords[i], cCoords[i+1]);
        vert.scale(polyScale);
        pVerts.push(vert);
    }
    var ball = new (PRU.Body)(PRU.Body.DYNAMIC, pos, 0);
    var shpe = new (PRU.ShapePoly)(pVerts);
    
    // One aspect of javascript is that everthing mashes but the
    // thing about any object is that it's not strictly forbidden
    // to lie about itself.
    // So as not to mung your code, and to make a goose act like a duck,
    // I made it quack like a duck.
    shpe.r = polyScale;
    
    // var shpe = new (PRU.ShapeCircle)(0,0,cannon.width/2*objToSpace);
    shpe.e=0.4;         // elasticity
    shpe.u=0.6;         // coef of friction
    shpe.density=0.5;   // material density
    ball.addShape(shpe);
    ball.resetMassData();   // recalculate mass
    cannonBalls.push(ball); // add to list of things to draw
    // speed is in meters/sec
    ball.v=dir.scale(cannonBallSpeed);
    levelSpace.addBody(ball);    // add it to the scene
};

var drawCannonBalls = function(){
    fill(50);
    noStroke();
    for(var i = 0; i < cannonBalls.length; i++){
        var b = cannonBalls[i];
        var pos = ToScreen(b.p);
        var sz = b.shapeArr[0].r * 2 * spaceToObj;
        //ellipse(pos.x, pos.y, sz, sz);
        drawCharacter("red", pos.x, pos.y, sz, b.a);
    }
};

/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                       End Scene Setup                      *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                        Scene Change                        *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var sCA = {
    //Animation Frame
    aF: 0,
    birdSpeedFactor: 1.3,
    maxBirdSizeFactor: 27,
    sceneChangesNow: false,
    animationEndsNow: false
};

var sceneChangeAnimation = function(){
    //-(x + s)^2 + 50sx
    //for s = birdSpeedFactor
    var birdSize = -pow(sCA.aF * sCA.birdSpeedFactor, 2) +
                    sCA.maxBirdSizeFactor * 2 *
                    sCA.birdSpeedFactor *
                    sCA.aF;
    drawCharacter("red", 200, 200, max(birdSize, 0));
    
    var parabolaVertexX = floor(
        sCA.maxBirdSizeFactor / sCA.birdSpeedFactor);
        
    sCA.sceneChangesNow = sCA.aF === parabolaVertexX;
    sCA.animationEndsNow = sCA.aF >= parabolaVertexX * 2;
    
    sCA.aF++;
};

var switchingScene = false;

var switchScene = function(){
    if(!switchingScene){
        sCA.aF = 1;
        switchingScene = true;
    }
    
    sceneChangeAnimation();
    
    //Wait for notification to change scene at the right time
    if(sCA.sceneChangesNow){
        levelSetup();
    }
    
    if(sCA.animationEndsNow){
        switchingScene = false;
    }
};



/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                       Rendering Setup                      *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

// good middle ground for crisp animation
// while still providing millis for other
// functions
var fps = 60;
var dt = 1/fps;

// adjust to for higher/lower velocity resolution
// affects engine performance (lower is faster)
var vel_iter = 8;

// adjust for higher/lower position resolution
// affects engine performance (lower is faster,
// but I think higher is better for collision
// detection and to prevent interlocking in higher
// energy collisions)
var pos_iter = 4;

// Makes objects sleep to start; prevents them from
// sliding and falling to begin with.
var warmStarting = true;

// Allows bodies to behave as if static when
// their energy runs out (until another object
// collides with them), helps engine performance.
// Also, the sleeping state can be used as a
// kill flag to make objects go away when they
// have stopped contributing to scene dynamics -
// such as loose bullets or what not.
var allowSleep = true;

frameRate(fps);


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                         Debugging                          *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var debugMode = false;

var grid = function(){
    if(debugMode){
        strokeWeight(1);
        stroke(0, 0, 0, 10);
        for(var f = 0; f <= 400; f += 400 / 40){
            line(f, 0, f, 400);
            line(0, f, 400, f);
        }
        stroke(255, 0, 0, 30);
        for(var f = 0; f <= 400; f += 400 / 10){
            line(f, 0, f, 400);
            line(0, f, 400, f);
        }
    }
};

var findFraction = function(decimal, fractionOutOf){
    switch(decimal * fractionOutOf){
        case 0: return "";
        case 1: return "1/16";
        case 2: return "1/8";
        case 3: return "3/16";
        case 4: return "1/4";
        case 5: return "5/16";
        case 6: return "3/8";
        case 7: return "7/16";
        case 8: return "1/2";
        case 9: return "9/16";
        case 10: return "5/8";
        case 11: return "11/16";
        case 12: return "3/4";
        case 13: return "13/16";
        case 14: return "7/8";
        case 15: return "15/16";
    }
};

var rMouse, whole, fraction;
var mouseText;

var mouseCoords = function(){
    var rnd2Nearest = 1/16;
    //"Rounded" Mouse
    rMouse = {
        x: round((mouseX/40 - 5) / rnd2Nearest) * rnd2Nearest,
        y: round(-(mouseY/40 - 5) / rnd2Nearest) * rnd2Nearest
    };
    whole = {
        x: rMouse.x > 0 ? floor(rMouse.x) : ceil(rMouse.x),
        y: rMouse.y > 0 ? floor(rMouse.y) : ceil(rMouse.y)
    };
    fraction = {
        x: findFraction(abs(rMouse.x - whole.x), 16),
        y: findFraction(abs(rMouse.y - whole.y), 16)
    };
    
    mouseText = "";
    mouseText += (whole.x || (!whole.x && !fraction.x)) ? whole.x + " " : (rMouse.x < 0 ? "-" : "");
    mouseText += fraction.x;
    mouseText += "\n";
    mouseText += (whole.y || (!whole.y && !fraction.y)) ? whole.y + " " : (rMouse.y < 0 ? "-" : "");
    mouseText += fraction.y;
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                       Mouse Handling                       *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

var mouseOverButton;

var checkIfMouseOverButton = function(){
    mouseOverButton = undefined;
    for(var f = 0; f < buttons.length; f++){
        if(mouseOverRect(buttons[f].x, buttons[f].y,
                         buttons[f].w, buttons[f].h)){
            mouseOverButton = buttons[f].t;
            break;
        }
    }
};

mousePressed = function(){
    switch(mouseOverButton){
        case "Replay Level":
            switchScene();
            break;
        case "Pause Level":
            
            break;
        default:
            fireCannon();
    }
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                     Keyboard Handling                      *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

keyPressed = function(){
    debugMode = keyCode === SHIFT ? !debugMode : debugMode;
};


/** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **\
*                            Draw                            *
\** ** ** ** ** ** ** ** ** * ** * ** ** ** ** ** ** ** ** **/

draw = function(){
    var ms = millis();
    
    background(148, 206, 222);
    
    ellipseMode(CENTER);
    rectMode(CENTER);
    
    //Backdrop
    noStroke();
    ellipseMode(CENTER);
    
    fill(168, 216, 219);
    ellipse(25, 265, 200, 50);
    ellipse(125, 270, 200, 50);
    ellipse(225, 265, 200, 50);
    ellipse(325, 270, 200, 50);
    ellipse(425, 265, 200, 50);
    
    fill(206, 233, 242);
    ellipse(-50, 275, 200, 50);
    ellipse(50, 280, 200, 50);
    ellipse(150, 275, 200, 50);
    ellipse(250, 280, 200, 50);
    ellipse(350, 275, 200, 50);
    
    strokeWeight(150);
    stroke(218, 239, 255);
    point(0, 348); point(85, 340); point(176, 339);
    point(265, 345); point(352, 340); point(432, 336);
    
    for(var f = 0; f < 400; f += 50){
        image(getImage("cute/GrassBlock"), f, 335, 50, 85);
        image(getImage("cute/DirtBlock"), f, 340, 50, 85);
    }
    
    grid();

    fill(255, 0, 0);
    drawCannonBalls();
    drawBlocks();
    drawCannon();
    
    fill(255);
    text(millis()-ms,10,20);
    ms=millis();
    levelSpace.step(dt, vel_iter, pos_iter, warmStarting, allowSleep);
    text(millis()-ms, 10, 40);
    
    mouseCoords();
    
    checkIfMouseOverButton();
    
    //Restart Button
    btn(5, 5, 25, 25,
        "Replay Level", 0);
    
    pushMatrix();
    translate(17.5, 17.5);
    noFill();
    strokeWeight(3);
    angleMode = "degrees";
    arc(0, 0, 12, 12, -207, 90);
    angleMode = "radians";
    line(-0.5, 6, 1.5, 2);
    line(-0.5, 6, 3.5, 6.5);
    popMatrix();
    
    //Pause Button
    btn(35, 5, 25, 25,
        "Pause Level", 0);
    
    pushMatrix();
    translate(47.5, 17.5);
    
    strokeWeight(3);
    line(-3.5, 6, -3.5, -6);
    line(3.5, 6, 3.5, -6);
    
    popMatrix();
    
    if(switchingScene){
        switchScene();
    }
    
    //Cursor
    noCursor();
    stroke(0, 0, 255);
    strokeWeight(3);
    translate(1/2, 1/2);
    point(rMouse.x * 40 + 200, -rMouse.y * 40 + 200);
    translate(-1/2, -1/2);
    
    if(debugMode){
        fill(0);
        textAlign(LEFT, BOTTOM);
        text(mouseText, mouseX + 5, mouseY);
    }
};
