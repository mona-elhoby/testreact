"use strict";(self.webpackChunkfinalproject=self.webpackChunkfinalproject||[]).push([[345],{36098:function(l,i,n){n(47313);var e=n(27998),o=n(46417);i.Z=function(l){return(0,o.jsx)(e.V,{className:"attachedHeader",children:(0,o.jsxs)(e.T6,{children:[(0,o.jsx)(e.is,{scope:"col",children:"#"}),(0,o.jsx)(e.is,{scope:"col",children:"\u0625\u0633\u0645 \u0627\u0644\u0645\u0644\u0641"}),(0,o.jsx)(e.is,{scope:"col",children:"\u0627\u0644\u0646\u0648\u0639"}),(0,o.jsx)(e.is,{scope:"col",children:"\u0627\u0644\u062d\u062c\u0645 (KB)"}),(0,o.jsx)(e.is,{scope:"col",children:"\u0627\u0644\u062a\u0627\u0631\u064a\u062e"}),(0,o.jsx)(e.is,{scope:"col",children:"\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645"}),l.editCiteria?(0,o.jsx)(e.is,{scope:"col"}):null]})})}},5306:function(l,i,n){var e=n(70885),o=n(47313),r=n(27998),s=n(33711),t=n(59108),d=n(57571),c=n(46417);i.Z=function(l){var i,n=o.useState(""),a=(0,e.Z)(n,2),u=a[0],h=a[1],v=(0,o.useState)(""),x=(0,e.Z)(v,2),m=x[0],p=x[1],j={headers:{"content-type":"multipart/form-data",Authorization:null===(i=JSON.parse(localStorage.getItem("userInfo")))||void 0===i?void 0:i.accessToken}};return(0,c.jsxs)(r.Tk,{visible:!0,onClose:function(){return l.exitSelectModal()},className:"delete-profile",children:[(0,c.jsx)(r.p0,{children:(0,c.jsx)(r.fl,{children:(0,t.Z)("add")})}),(0,c.jsx)(r.sD,{children:(0,c.jsx)(r.jO,{type:"file",id:"formFile",value:u,onChange:function(l){p(l.target.files[0]),h(l.target.value)}})}),(0,c.jsxs)(r.Ym,{children:[(0,c.jsx)(r.u5,{className:"btn-modal-save ",color:"primary",onClick:function(){if(console.log(m),m.size>104857600)l.setOpenLargeAttachement(!0);else{var i=new FormData;i.append("file",m),s.Z.post("".concat(d.YZ,"/").concat(l.url),i,j).then((function(i){200==i.status?(l.exitSelectModal(),l.setOpenAddSnack(!0),l.callback()):l.setOpenAttachedSnack(!0)}))}},children:(0,t.Z)("save")}),(0,c.jsx)(r.u5,{className:"btn-modal-close",color:"danger",onClick:function(){return l.exitSelectModal()},children:(0,t.Z)("close")})]})]})}},97512:function(l,i,n){n(47313);var e=n(27998),o=n(22370),r=n(45498),s=n(59108),t=n(46417);i.Z=function(l){return(0,t.jsxs)(e.Tk,{visible:!0,onClose:function(){return l.exitSelectModal()},className:"delete-profile",children:[(0,t.jsx)(e.p0,{children:(0,t.jsx)(e.fl,{children:(0,t.jsx)(o.Z,{style:{height:"20px"},icon:r.N,customClassName:"nav-icon"})})}),(0,t.jsxs)(e.sD,{children:[" ",(0,s.Z)("confirmMsg")," "]}),(0,t.jsxs)(e.Ym,{children:[(0,t.jsx)(e.u5,{className:"btn-modal-save ",color:"primary",onClick:l.handleDelete,children:(0,s.Z)("yes")}),(0,t.jsx)(e.u5,{className:"btn-modal-close",color:"danger",onClick:function(){return l.exitSelectModal()},children:(0,s.Z)("no")})]})]})}},50181:function(l,i,n){n.r(i),n.d(i,{default:function(){return M}});var e=n(1413),o=n(70885),r=n(47313),s=n(58467),t=n(27998),d=n(22370),c=n(45498),a=n(10094),u=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M16,112V496H496V112ZM236.8,341.6a32.167,32.167,0,0,0,38.4,0L298.667,324,464,448v16H48V448L213.333,324ZM256,316,48,160V144H464v16ZM48,200,186.667,304,48,408ZM464,408,325.333,304,464,200Z' class='ci-primary'/>"],h=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z' class='ci-primary'/>"],v=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M487.944,233.654,424,176.815V89.373L350.627,16H152V144H80a24.028,24.028,0,0,0-24,24V472a24.028,24.028,0,0,0,24,24H496V251.593A24.024,24.024,0,0,0,487.944,233.654ZM152,464H88V176h64ZM328,48h9.373L392,102.627V112H328ZM184,48H296v96h96v72H184ZM464,464H184V248H424V219.629l40,35.557Z' class='ci-primary'/><rect width='32' height='32' x='232' y='344' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='296' y='344' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='232' y='408' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='296' y='408' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='360' y='344' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='32' x='360' y='408' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='160' height='32' x='232' y='280' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/>"],x=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z' class='ci-primary'/>"],m=n(75614),p=n(33471),j=n(57765),C=n(79136),_=n(85554),E=n(936),I=n(74775),L=n(36098),f=n(62338),N=n(44022),Z=n(59403),A=(n(13299),n(31428)),y=n(97512),S=n(5306),g=n(59108),T=n(46417),b=function(){var l,i,n,b=(0,r.useState)(null),M=(0,o.Z)(b,2),D=M[0],O=M[1],H=(0,r.useState)(!1),F=(0,o.Z)(H,2),P=F[0],Y=F[1],R=(0,r.useState)(!1),V=(0,o.Z)(R,2),k=V[0],w=V[1],G=(0,r.useState)(!1),B=(0,o.Z)(G,2),K=B[0],U=B[1],X=(0,r.useState)(!1),z=(0,o.Z)(X,2),q=z[0],J=z[1],W=(0,r.useState)(!1),Q=(0,o.Z)(W,2),$=(Q[0],Q[1]),ll=(0,r.useState)(null),il=(0,o.Z)(ll,2),nl=il[0],el=il[1],ol=(0,s.UO)().id,rl=(0,r.useState)(!1),sl=(0,o.Z)(rl,2),tl=(sl[0],sl[1]),dl=(0,r.useState)(""),cl=(0,o.Z)(dl,2),al=cl[0],ul=cl[1],hl=(0,r.useState)(""),vl=(0,o.Z)(hl,2),xl=vl[0],ml=vl[1],pl=(0,r.useState)(!1),jl=(0,o.Z)(pl,2),Cl=jl[0],_l=jl[1],El=(0,r.useState)(!1),Il=(0,o.Z)(El,2),Ll=Il[0],fl=Il[1],Nl=(0,r.useState)(""),Zl=(0,o.Z)(Nl,2),Al=Zl[0],yl=Zl[1],Sl=(0,r.useState)(""),gl=(0,o.Z)(Sl,2),Tl=gl[0],bl=gl[1],Ml=(0,r.useState)(!1),Dl=(0,o.Z)(Ml,2),Ol=Dl[0],Hl=Dl[1],Fl=(0,r.useState)(!1),Pl=(0,o.Z)(Fl,2),Yl=Pl[0],Rl=Pl[1],Vl=(0,r.useState)(!1),kl=(0,o.Z)(Vl,2),wl=kl[0],Gl=kl[1],Bl=(0,E.Z)().formatMessage,Kl=(0,_.I0)(),Ul=(0,_.v9)((function(l){return l.contact})).profile,Xl=(0,s.s0)(),zl=r.forwardRef((function(l,i){return(0,T.jsx)(C.Z,(0,e.Z)({elevation:6,ref:i,variant:"filled"},l))}));(0,r.useEffect)((function(){Kl((0,N.K2)()),Kl((0,N.Ai)(ol)).then((function(l){var i;"Client not found."==(null===(i=l.payload)||void 0===i?void 0:i.message)?Xl("/404"):O(l.payload)})),Kl((0,N.bl)(ol)).then((function(l){return ul(l.payload)}))}),[]);var ql=function(l,i){"clickaway"!==i&&(J(!1),Rl(!1))},Jl=function(){Kl((0,N.GK)(ol)).then((function(l){var i,n,e,o;null!==(i=l.payload)&&void 0!==i&&null!==(n=i.res.data)&&void 0!==n&&null!==(e=n.message)&&void 0!==e&&e.includes("Client cannot be deleted.")?(el(null===(o=l.payload)||void 0===o?void 0:o.res.data),U(!0),w(!1)):Xl("/contacts")})),U(!0)};return(0,T.jsxs)("div",{className:"profile",children:[(0,T.jsxs)(t.rb,{children:[(0,T.jsx)(t.b7,{lg:8,md:7,children:(0,T.jsx)(t.rb,{children:(0,T.jsx)(t.b7,{md:12,children:(0,T.jsxs)("div",{className:"cover",children:[(0,T.jsx)("div",{className:"cover-bg"}),(0,T.jsxs)("div",{className:"profile-pic list",children:[(0,T.jsxs)("div",{style:{display:"flex",alignItems:"flex-end"},children:[(0,T.jsx)("div",{className:"float-right",children:(0,T.jsx)("div",{className:"img",children:(0,T.jsx)("img",{src:I,width:"100%"})})}),(0,T.jsxs)("div",{className:"float-left",style:{paddingBottom:"10px"},children:[(0,T.jsx)("strong",{children:"ltr"==document.body.getAttribute("dir")&&null!==Ul&&void 0!==Ul&&Ul.CLI_NAME_ENGLISH?null===Ul||void 0===Ul?void 0:Ul.CLI_NAME_ENGLISH:null===Ul||void 0===Ul?void 0:Ul.CLI_NAME}),(0,T.jsx)("p",{children:"string"==typeof(null===Ul||void 0===Ul?void 0:Ul.CLI_MOBILE)?null===Ul||void 0===Ul||null===(l=Ul.CLI_MOBILE)||void 0===l?void 0:l.split(",")[0]:"object"==typeof(null===Ul||void 0===Ul?void 0:Ul.CLI_MOBILE)?null===Ul||void 0===Ul?void 0:Ul.CLI_MOBILE[0]:"... "}),(0,T.jsx)("p",{children:(null===Ul||void 0===Ul||null===(i=Ul.classification)||void 0===i?void 0:i.length)>0?null===Ul||void 0===Ul?void 0:Ul.classification.map((function(l){return"ltr"==document.body.getAttribute("dir")?null===l||void 0===l?void 0:l.CLI_TYPE_NAME_EN:l.CLI_TYPE_NAME+", "})):null!==Ul&&void 0!==Ul&&Ul.DT_TYPE?null===Ul||void 0===Ul?void 0:Ul.DT_TYPE.map((function(l){var i;return(null===f.Bc||void 0===f.Bc||null===(i=f.Bc.find((function(i){return i.id==l})))||void 0===i?void 0:i.arName)+", "})):"..."})]})]}),(0,T.jsxs)("div",{className:"btns",children:[(0,T.jsxs)(t.u5,{className:"btn-modal-close",onClick:function(){return Y(!0)},children:[(0,T.jsx)(d.Z,{style:{height:"20px"},icon:a.l,customClassName:"nav-icon"}),(0,g.Z)("update")]}),(0,T.jsxs)(t.u5,{color:"danger",className:"btn-modal-close",onClick:function(){return w(!0)},children:[(0,T.jsx)(d.Z,{style:{height:"20px"},icon:c.N,customClassName:"nav-icon"}),(0,g.Z)("delete")]})," "]})]})]})})})}),(0,T.jsx)(t.b7,{lg:4,md:5,children:(0,T.jsxs)("div",{className:"info-detail",children:[(0,T.jsxs)("p",{children:[(0,T.jsx)(d.Z,{style:{height:"20px"},icon:u,customClassName:"nav-icon"}),(0,T.jsx)("span",{children:"string"==typeof(null===Ul||void 0===Ul?void 0:Ul.CLI_EMAIL)&&null!==Ul&&void 0!==Ul&&Ul.CLI_EMAIL?null===Ul||void 0===Ul||null===(n=Ul.CLI_EMAIL)||void 0===n?void 0:n.split(",")[0]:"object"==typeof(null===Ul||void 0===Ul?void 0:Ul.CLI_EMAIL)?null===Ul||void 0===Ul?void 0:Ul.CLI_EMAIL[0]:"..."})]}),(0,T.jsxs)("p",{children:[(0,T.jsx)(d.Z,{style:{height:"20px"},icon:h,customClassName:"nav-icon"}),(0,T.jsx)("span",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_PHONE?null===Ul||void 0===Ul?void 0:Ul.CLI_PHONE:"..."})]}),(0,T.jsxs)("p",{children:[(0,T.jsx)(d.Z,{style:{height:"20px"},icon:v,customClassName:"nav-icon"}),(0,T.jsx)("span",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_FAX?null===Ul||void 0===Ul?void 0:Ul.CLI_FAX:"..."})]}),(0,T.jsxs)("p",{children:[(0,T.jsx)(d.Z,{style:{height:"20px"},icon:x,customClassName:"nav-icon"}),(0,T.jsx)("span",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_ADDRESS?null===Ul||void 0===Ul?void 0:Ul.CLI_ADDRESS:"..."})]})]})})]}),(0,T.jsx)(t.rb,{children:(0,T.jsxs)(t.b7,{lg:8,md:7,children:[(0,T.jsxs)("h6",{className:"info-title",children:[" ",(0,T.jsx)(d.Z,{style:{height:"20px"},icon:m.E,customClassName:"nav-icon"})," ",(0,g.Z)("personalInfo")]}),(0,T.jsx)("div",{className:"info-details",children:(0,T.jsxs)(t.rb,{children:[0==(null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY)?(0,T.jsxs)(t.b7,{md:4,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[(0,g.Z)("nationality")," "]}),(0,T.jsx)("p",{children:"ltr"==document.body.getAttribute("dir")&&null!==Ul&&void 0!==Ul&&Ul.NAT_NAME_EN?null===Ul||void 0===Ul?void 0:Ul.NAT_NAME_EN:null===Ul||void 0===Ul?void 0:Ul.NAT_NAME})]}):null,(0,T.jsxs)(t.b7,{md:4,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[(0,g.Z)("type")," "]}),(0,T.jsx)("p",{children:"ltr"==document.body.getAttribute("dir")&&null!==Ul&&void 0!==Ul&&Ul.CLI_CATEGORY_NAME_EN?null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY_NAME_EN:null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY_NAME})]}),0==(null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY)?(0,T.jsxs)(t.b7,{md:4,children:[(0,T.jsx)(t.L8,{htmlFor:"inputEmail4",children:(0,g.Z)("sponserName")}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_SPONSOR_NAME?null===Ul||void 0===Ul?void 0:Ul.CLI_SPONSOR_NAME:(0,g.Z)("notFound")})]}):null,0==(null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY)?(0,T.jsx)(t.b7,{md:6,children:(0,T.jsx)(t.xH,{children:(0,T.jsxs)(t.rb,{children:[(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsx)(t.L8,{htmlFor:"inputEmail4",children:(0,g.Z)("identity")}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_IDENTITYNO?null===Ul||void 0===Ul?void 0:Ul.CLI_IDENTITYNO:(0,g.Z)("notFound")})]}),(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("identityIssue")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_ID_ISSUE_DATE?new Date(null===Ul||void 0===Ul?void 0:Ul.CLI_ID_ISSUE_DATE).toDateString():(0,g.Z)("notFound")})]}),(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("identityExpired")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_ID_EXPIRY_DATE?new Date(null===Ul||void 0===Ul?void 0:Ul.CLI_ID_EXPIRY_DATE).toDateString():(0,g.Z)("notFound")})]})]})})}):null,0==(null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY)?(0,T.jsx)(t.b7,{md:6,children:(0,T.jsxs)(t.xH,{children:[(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("passportNum")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_PASSPORT_NO?null===Ul||void 0===Ul?void 0:Ul.CLI_PASSPORT_NO:(0,g.Z)("notFound")})]}),(0,T.jsxs)(t.b7,{children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("passportIssue")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_PASSPORT_ISSUE_DATE?new Date(null===Ul||void 0===Ul?void 0:Ul.CLI_PASSPORT_ISSUE_DATE).toDateString():(0,g.Z)("notFound")})]}),(0,T.jsxs)(t.b7,{children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:["  ",(0,g.Z)("passportExpired")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_PASSPORT_EXPIRY_DATE?new Date(null===Ul||void 0===Ul?void 0:Ul.CLI_PASSPORT_EXPIRY_DATE).toDateString():(0,g.Z)("notFound")})]})]})}):null,0==(null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY)?(0,T.jsx)(t.b7,{md:6,children:(0,T.jsxs)(t.xH,{children:[(0,T.jsxs)(t.b7,{children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:["  ",(0,g.Z)("residencyNum")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_RESIDENCYNO?null===Ul||void 0===Ul?void 0:Ul.CLI_RESIDENCYNO:(0,g.Z)("notFound")})]}),(0,T.jsxs)(t.b7,{children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("residencyExpired")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_RESIDENCY_EXPIRY_DATE?new Date(null===Ul||void 0===Ul?void 0:Ul.CLI_RESIDENCY_EXPIRY_DATE).toDateString():(0,g.Z)("notFound")})]})]})}):null,0==!(null!==Ul&&void 0!==Ul&&Ul.CLI_CATEGORY)?(0,T.jsxs)(t.b7,{md:4,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[(0,g.Z)("theCompany")," "]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_COMPANYTYPE_NAME?null===Ul||void 0===Ul?void 0:Ul.CLI_COMPANYTYPE_NAME:(0,g.Z)("notFound")})]}):null,0==!(null!==Ul&&void 0!==Ul&&Ul.CLI_CATEGORY)?(0,T.jsxs)(t.b7,{md:4,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[(0,g.Z)("licenseNum"),"  "]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_LICENSE_NO?null===Ul||void 0===Ul?void 0:Ul.CLI_LICENSE_NO:(0,g.Z)("notFound")})]}):null,0==!(null!==Ul&&void 0!==Ul&&Ul.CLI_CATEGORY)?(0,T.jsxs)(t.b7,{md:4,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[(0,g.Z)("licenseExpired"),"  "]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_LICENSE_DATE?null===Ul||void 0===Ul?void 0:Ul.CLI_LICENSE_DATE:(0,g.Z)("notFound")})]}):null,0==!(null!==Ul&&void 0!==Ul&&Ul.CLI_CATEGORY)?(0,T.jsxs)(t.b7,{md:4,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("taxNum")," "]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_TAX_NUMBER?null===Ul||void 0===Ul?void 0:Ul.CLI_TAX_NUMBER:(0,g.Z)("notFound")})]}):null,(0,T.jsxs)(t.b7,{md:0==!(null!==Ul&&void 0!==Ul&&Ul.CLI_CATEGORY)?4:6,children:[0==(null===Ul||void 0===Ul?void 0:Ul.CLI_CATEGORY)?(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("unifiedNumber")]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_IDENTITYNO?null===Ul||void 0===Ul?void 0:Ul.CLI_IDENTITYNO:(0,g.Z)("notFound")})]}):null,(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("language")," "]}),(0,T.jsx)("p",{children:null!==Ul&&void 0!==Ul&&Ul.CLI_FAV_LANG_DESC?null===Ul||void 0===Ul?void 0:Ul.CLI_FAV_LANG_DESC:(0,g.Z)("notFound")})]})]}),(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsxs)(t.L8,{htmlFor:"inputEmail4",children:[" ",(0,g.Z)("notes"),"  "]}),(0,T.jsx)("p",{children:"ltr"==document.body.getAttribute("dir")?null===Ul||void 0===Ul?void 0:Ul.CLI_NOTES_EN:null===Ul||void 0===Ul?void 0:Ul.CLI_NOTES})]}),(0,T.jsxs)(t.b7,{md:12,children:[(0,T.jsxs)(t.L8,{children:[" ",(0,g.Z)("attachments")," ",(0,T.jsx)(d.Z,{size:"sm",icon:p.q,customClassName:"nav-icon",style:{height:"16px",width:"16px"},onClick:function(){return function(l){ml(4),bl(l)}(null===Ul||void 0===Ul?void 0:Ul.APP_ID_PK)}})]}),(null===Ul||void 0===Ul?void 0:Ul._FILE)>0&&al.length>0?(0,T.jsxs)(t.Sx,{bordered:!0,responsive:!0,children:[(0,T.jsx)(L.Z,{}),(0,T.jsx)(t.NR,{children:null===al||void 0===al?void 0:al.map((function(l,i){return(0,T.jsxs)(t.T6,{onClick:function(){Kl((0,N.xC)({id:null===Ul||void 0===Ul?void 0:Ul.CLI_ID_PK,attachedId:null===l||void 0===l?void 0:l.ATH_ID_PK,fileName:null===l||void 0===l?void 0:l.ATH_NAME})).then((function(l){404==(null===l||void 0===l?void 0:l.payload.status)&&_l(!0)}))},style:{cursor:"pointer"},children:[(0,T.jsx)(t.is,{scope:"row",children:i}),(0,T.jsx)(t.NN,{children:null===l||void 0===l?void 0:l.ATH_NAME}),(0,T.jsx)(t.NN,{children:null===l||void 0===l?void 0:l.TYP_NAME}),(0,T.jsx)(t.NN,{children:null===l||void 0===l?void 0:l.ATH_SIZE}),(0,T.jsx)(t.NN,{children:new Date(null===l||void 0===l?void 0:l.ATH_DATE).toLocaleDateString()}),(0,T.jsx)(t.NN,{children:null===l||void 0===l?void 0:l.USR_NAME}),null!==Ul&&void 0!==Ul&&Ul.CLI_ID_PK?(0,T.jsx)(t.NN,{children:(0,T.jsx)(t.u5,{color:"danger",onClick:function(){return function(l,i){w(!0),yl(l),Hl(i)}(null===l||void 0===l?void 0:l.ATH_ID_PK,null===Ul||void 0===Ul?void 0:Ul.CLI_ID_PK)},children:(0,T.jsx)(d.Z,{style:{height:"16px",marginRight:"-3px"},icon:c.N,customClassName:"nav-icon"})})}):null]},i)}))})]}):(0,T.jsx)("p",{children:(0,g.Z)("notFound")})]})]})})]})}),k&&Ol&&Al?(0,T.jsx)(y.Z,{exitSelectModal:function(){return w(!1)},handleDelete:function(){Kl((0,N.OW)({id:Ol,deletedId:Al})).then((function(l){var i,n;200==(null===l||void 0===l||null===(i=l.payload)||void 0===i||null===(n=i.res)||void 0===n?void 0:n.status)?(tl(!0),w(!1),Kl((0,N.bl)(Ol)).then((function(l){return ul(l.payload)})),bl("")):_l(!0)}))}}):k||Ol||Al?null:(0,T.jsxs)(t.Tk,{visible:k,onClose:function(){return w(!1)},className:"delete-profile",children:[(0,T.jsx)(t.p0,{children:(0,T.jsx)(t.fl,{children:(0,T.jsx)(d.Z,{style:{height:"20px"},icon:c.N,customClassName:"nav-icon"})})}),(0,T.jsx)(t.sD,{style:{padding:"40px 10px"},children:(0,g.Z)("confirmMsg")}),(0,T.jsxs)(t.Ym,{children:[(0,T.jsx)(t.u5,{color:"danger",className:"btn-modal-close",onClick:Jl,children:(0,g.Z)("yes")}),(0,T.jsx)(t.u5,{className:"btn-modal-save",color:"primary",onClick:function(){return w(!1)},children:(0,g.Z)("no")})]})]}),P?(0,T.jsx)(A.Z,{editCriterai:D,exitSelectModal:function(){Y(!1)},id:null===D||void 0===D?void 0:D.CLI_ID_PK,setOpenAddSnack:$,setOpenEditSnack:J,setClassificationConflict:Gl}):null,null!==nl&&void 0!==nl&&nl.code?(0,T.jsx)(j.Z,{open:K,autoHideDuration:2e3,onClose:ql,children:(0,T.jsx)(zl,{onClose:ql,severity:"error",sx:{width:"100%"},children:(0,g.Z)("alreadyUSed")})}):q||Cl||Ll||wl?(0,T.jsx)(j.Z,{open:!0,autoHideDuration:2e3,onClose:ql,children:(0,T.jsx)(zl,{onClose:ql,severity:Cl||Ll||wl||Yl?"error":"success",sx:{width:"100%"},children:q?(0,g.Z)("itemUpdated"):wl?(0,g.Z)("classificationConflict"):Cl?(0,g.Z)("error"):Ll?Bl({id:"largeAttachment"}):Yl?(0,g.Z)("error"):(0,g.Z)("itemAdded")})}):null,1==xl?(0,T.jsx)(Z.n,{exitSelectModal:function(){return ml("")}}):2==xl?(0,T.jsx)(Z.V,{exitSelectModal:function(){return ml("")}}):4==xl?(0,T.jsx)(S.Z,{exitSelectModal:function(){return ml("")},url:"client/".concat(Tl,"/attachment"),id:Tl,setOpenAddSnack:$,setOpenAttachedSnack:_l,setOpenLargeAttachement:fl,callback:function(){return Kl((0,N.bl)(null===Ul||void 0===Ul?void 0:Ul.CLI_ID_PK)).then((function(l){return ul(l.payload)}))}}):null]})},M=r.memo(b)},10094:function(l,i,n){n.d(i,{l:function(){return e}});var e=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M29.663,482.25l.087.087a24.847,24.847,0,0,0,17.612,7.342,25.178,25.178,0,0,0,8.1-1.345l142.006-48.172,272.5-272.5A88.832,88.832,0,0,0,344.334,42.039l-272.5,272.5L23.666,456.541A24.844,24.844,0,0,0,29.663,482.25Zm337.3-417.584a56.832,56.832,0,0,1,80.371,80.373L411.5,180.873,331.127,100.5ZM99.744,331.884,308.5,123.127,388.873,203.5,180.116,412.256,58.482,453.518Z' class='ci-primary'/>"]},45498:function(l,i,n){n.d(i,{N:function(){return e}});var e=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z' class='ci-primary'/><rect width='32' height='200' x='168' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='240' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='312' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z' class='ci-primary'/>"]},75614:function(l,i,n){n.d(i,{E:function(){return e}});var e=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z' class='ci-primary'/>"]}}]);