(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{47:function(e,t,a){e.exports=a(91)},52:function(e,t,a){},91:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(42),r=a.n(s),l=a(4),i=a(5),c=a(7),m=a(6),d=a(8),u=a(15),h=a(17),p=(a(52),a(18)),b=a(23),f=a.n(b),E=a(14),N=a.n(E);N.a.initializeApp({apiKey:"AIzaSyA4yDbpMJo_81wiX8tvikLe7fkrVeJuo4w",authDomain:"collegenav-2e04d.firebaseapp.com",databaseURL:"https://collegenav-2e04d.firebaseio.com",projectId:"collegenav-2e04d",storageBucket:"collegenav-2e04d.appspot.com",messagingSenderId:"261170856716",appId:"1:261170856716:web:a7953ec167b2a338"});var v=N.a,k=a(24),C=a(20),g=a.n(C),S=a(25),y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).displayDetails=function(){var e=a.props.schoolMoreInfo,t=e.bestPhoto,s=e.name,r=e.contact,l=e.location,i=e.description,c=e.url;return o.a.createElement(n.Fragment,null,o.a.createElement("div",{className:"detailsOverlay"}),o.a.createElement("div",{className:"detailsModal"},o.a.createElement("div",{className:"detailsFlex"},o.a.createElement("button",{onClick:a.props.closeModal,className:"closeButton",ref:a.closeModalButton,tabIndex:"5"},o.a.createElement("i",{className:"fas fa-times","aria-label":"close modal"})),void 0!==t?o.a.createElement("div",{className:"imgWrapper"},o.a.createElement("img",{src:"".concat(t.prefix,"400x400").concat(t.suffix),alt:"".concat(s),tabIndex:"5"})):null,o.a.createElement("div",{className:"smallInfoWrapper"},o.a.createElement("p",{tabIndex:"5"},s),o.a.createElement("p",{tabIndex:"5"},l.formattedAddress),r.facebook?o.a.createElement("p",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.facebook.com/".concat(r.facebook),tabIndex:"5"},o.a.createElement("i",{className:"fab fa-facebook","aria-label":"Go to facebook"})," ",r.facebookName)):null,r.twitter?o.a.createElement("p",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://twitter.com/".concat(r.twitter),tabIndex:"5"},o.a.createElement("i",{className:"fab fa-twitter","aria-label":"Go to twitter"})," @",r.twitter)):null,void 0!==c?o.a.createElement("p",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:c,tabIndex:"5"},o.a.createElement("i",{className:"fas fa-link","aria-label":"Go to website"})," Website")):null,r.formattedAddress?o.a.createElement("p",{tabIndex:"5"},o.a.createElement("span",null,o.a.createElement("i",{className:"fas fa-phone"}))," ",r.formattedPhone):null),o.a.createElement("div",{className:"descriptionWrapper"},void 0!==i?o.a.createElement("p",{tabIndex:"5"},i):null))))},a.closeModalButton=o.a.createRef(),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.closeModalButton.current.focus()}},{key:"render",value:function(){return o.a.createElement("div",{className:"modalWrapper ".concat(this.props.modalStatus)},this.displayDetails())}}]),t}(n.Component),I=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleClick=function(t){"fas fa-bookmark"===t?N.a.database().ref().once("value",function(t){var a=t.val(),n=[];for(var o in a)n.push({dbKey:o,id:a[o].id});n.forEach(function(t){t.id===e.props.bookmarkId&&(e.setState({bookmark:"far fa-bookmark",ariaBookmark:"item not bookmarked"}),N.a.database().ref(t.dbKey).remove())})}):"far fa-bookmark"===t&&(e.setState({bookmark:"fas fa-bookmark",ariaBookmark:"item bookmarked"}),e.props.addBookmark(e.props.bookmarkId))},e.state={bookmark:"far fa-bookmark",ariaBookmark:"item not bookmarked"},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;N.a.database().ref().once("value",function(t){var a=t.val(),n=[];for(var o in a)n.push({id:a[o].id});null!==n&&n.length>0&&n.forEach(function(t){t.id===e.props.bookmarkId&&e.setState({bookmark:"fas fa-bookmark",ariaBookmark:"item bookmarked"})})})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"bookmarkPosition"},o.a.createElement("button",{className:"bookmark",onClick:function(){return e.handleClick(e.state.bookmark)}},o.a.createElement("i",{className:"".concat(this.state.bookmark," bookmarkIcon"),"aria-label":this.state.ariaBookmark})))}}]),t}(n.Component),B=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).addBookmark=function(t){e.props.setBookmarkState(t)},e.closeModal=function(){e.setState({modalStatus:"close"})},e.moreInfo=function(t){e.setState({moreInfoID:t}),f.a.get("https://api.foursquare.com/v2/venues/".concat(t),{params:{client_id:e.state.clientID[e.state.keyCounter],client_secret:e.state.clientSecret[e.state.keyCounter],v:20190601}}).then(function(t){var a=t.data.response.venue;e.setState({schoolMoreInfo:a,modalStatus:"open"})}).catch(function(t){429===t.response.status&&(e.state.keyCounter<e.state.clientID.length-1?e.setState({keyCounter:e.state.keyCounter+1},function(){e.moreInfo(e.state.moreInfoID)}):e.setState({keyCounter:0}))})},e.handleChange=function(t){if(e.setState({userSearch:t.target.value}),""===t.target.value)e.setState({schoolsList:e.props.schoolsList});else{var a=e.props.schoolsList.filter(function(e){return-1!==e.name.toLowerCase().indexOf(t.target.value.toLowerCase())});e.setState({schoolsList:a})}},e.state={bookmarked:!1,schoolMoreInfo:{},modalStatus:"close",clientID:["JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY","FIQECXQNZC4NEV00SFTF3535BMLFZSUW2XXHXEERFGTTCJDG","CJ4XSVLTY1JQ3SPHZV00JRFHCFAIXO5Y1HAASCOPGXG3URXV","MATE2LSJXUO3JS3LXR1NMMTSUE1PGF15ADCMGRUA23UCVVDM","QZIM15RPPGTGIA5QB0NA3ZMK3UUOSR1GU12SJLQG1MOYRNPA","NJZBAFQGJBCPNIDWS2FJ4OC1SCXB34QCAFPVJDDBKU2GANFO","VGQEXUC1OBLYR2OGNSCLDDA0Z3V1XYT35BVUR5KXOZ2SER5A","WWHHWA0S4GFHODY54K2FZS5XP1YROPRBPDRVG31MUMNGKDMM","2NFNP2CN0KXN5G0INYBVQZOZUIC0D3XT0FOZXZRPVQN4GZZA","VMT1CVWVRRTVEEOJWSER3UPCWUKR11INNAGCYRFDVGNCT4Y5","SUXPJ05HNSW0NCIBMJJ2SHHA3DJMYBLM4FVFPOG5Y1TA3VC1","SSZTT4XQDRSNJDAJVQTNGBUSM1ABD32WT1VG3C5Z1XND33H2","EI1UC5BD2LNXQGTNN4SW0DZMDI5W3QNQ3A4ZNCEWP54ZSY0JClient"],clientSecret:["XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3","EQZ42P3U5DO5PVOQVKG4AQFEDUAPVQ4ZTIOEDDLMER2EJFJX","WUABEMQMIZBR2LSKFURNG4NY2IF10CDAPAX0QSWWYGFGV2ZP","SZRKDMSYSFHU23FQLJR4VXRLHBBQQC1MLJCKSACB5A2EVGPS","VUM2WEQ55KAX3405NTCPFR145DKCD3FUS5YM0GWNJYXEJGA2","HBFVKQJJDP4HLH0F4DG15DMXRV1GMOMH0LTIFSMFMYYLGNFB","3TNU5JJ4EPOKSBEHMLUXJTXBUJTFNRYG5EO203ITHUAHOO5C","DV2P4N505ZWOEGEZQUCDQ0FV5OJ3HDW1RVL44VQQYCNC13QW","5EWVDITYF2KCEB4ZHY32TN0XV31ONYEDXX5A1YMPDBMBHLIC","3XQL24IHR2TIODEGQ5WH0CW03K3E2G4OCR4VAORZ23CNHZRO","0KKBUXNYC4HWALSJTL2UA0QGZJQQ5X0UOZIPK5ROL03RPPZA","KMO0VYQBDDXMGZ2QM4BJIFB2D0TB0ZMCEWE3LW1KBO2LIIH2","D50NHW2CPNKH1I3APUMVBT4XON33QK3HLW225P5N023MXL4O"],keyCounter:0,moreInfoID:null,userSearch:"",schoolsList:[]},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({schoolsList:e.schoolsList})}},{key:"render",value:function(){var e=this;return o.a.createElement(n.Fragment,null,o.a.createElement("div",{className:"schoolResults wrapper","aria-live":"polite"},o.a.createElement(S.CircleArrow,{AnimationDuration:500,ShowAtPosition:350,style:{fill:"#073330",height:30,width:30,right:15,border:"3px solid #073330",background:"rgba(255, 255, 255, 0.848)"}}),this.state.schoolsList.length>0?o.a.createElement("div",{className:"schoolsListSearchInput singleContent"},o.a.createElement("label",{htmlFor:"schoolsListSearch"},"Filter Search:"),o.a.createElement("input",{type:"text",placeholder:"search",name:"userSearch",value:this.state.userSearch,id:"schoolsListSearch",className:"schoolsListSearch",onChange:this.handleChange})):null,o.a.createElement("ul",{className:"schoolsList","aria-live":"polite"},Array.isArray(this.state.schoolsList)?this.state.schoolsList.map(function(t){var a=t.id,n=t.name,s=t.location,r=s.address,l=s.city,i=s.country;return o.a.createElement("li",{key:a,className:"result singleContent",tabIndex:"0","aria-hidden":"false"},o.a.createElement("p",{className:"resultName"},n),o.a.createElement("p",{className:"resultAddress"},r," - ",l),o.a.createElement("p",{className:"resultCountry"},i),o.a.createElement(I,{bookmarkId:a,addBookmark:e.addBookmark}),o.a.createElement("button",{className:"generalButton",onClick:function(){return e.moreInfo(a)}},"More Info"))}):o.a.createElement("li",{className:"noResult singleContent"},o.a.createElement("p",{className:"resultName"},this.props.schoolsList)))),"open"===this.state.modalStatus?o.a.createElement(y,{schoolMoreInfo:this.state.schoolMoreInfo,modalStatus:this.state.modalStatus,closeModal:this.closeModal}):null)}}]),t}(n.Component),O=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).apiCall=function(){f.a.get("https://api.foursquare.com/v2/venues/search",{params:{client_id:"JYPGSEYBVO44BBH553GNVMI1OCUCDFTFZUS2H0X5JLMCMOVY",client_secret:"XBVDWZV2LUQS3RUWTMJJQVJMKZY5HACXHKCGT4ZXVHHXX5K3",v:20190601,near:e.state.userInput,categoryId:e.state.institution,radius:25e3,intent:"checkin",limit:50}}).then(function(t){var a=/centre|center|park|building|pool|hall|office of le president|division of|department|campus|residence|faculty|campus|public|room/i,n=t.data.response.venues.filter(function(e){var t=e.categories[0].shortName;return("University"===t||"Community College"===t||"Trade School"===t)&&!a.test(e.name)&&void 0!==e.location.address});e.setState({schoolsList:n})}).catch(function(t){400===t.response.status?e.setState({schoolsList:"We're sorry. There are zero results for your search."}):429===t.response.status&&e.setState({schoolsList:"You have exceeded your daily limit of searches. You should probably go outside..."})})},e.setBookmarkState=function(t){e.state.schoolsList.forEach(function(e){e.id===t&&v.database().ref().push({name:e.name,address:e.location.address,id:e.id,category:e.categories[0].name})})},e.handleChange=function(t){e.setState(Object(p.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){0===e.state.institution.length||0===e.state.userInput.length?g()({title:"oops",text:"please make sure all fields are entered",icon:"warning"}):!1===/^\s*$/.test(e.state.userInput)?(e.apiCall(),Object(k.a)(".schoolResults",{duration:1e3,offset:-50,a11y:!0})):g()({title:"oops",text:"please enter a search",icon:"warning"}),t.preventDefault()},e.state={userInput:"",institution:"",selectSchoolId:"",schoolsList:[]},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(n.Fragment,null,o.a.createElement("div",{className:"searchContainer"},o.a.createElement("form",{onSubmit:this.handleSubmit,className:"searchForm wrapper"},o.a.createElement("div",{className:"smallWrapper"},o.a.createElement("div",{className:"instructions"},o.a.createElement("p",null,"Search for a school near you!"),o.a.createElement("p",null,"(Select an Institution Type)")),o.a.createElement("div",{className:"radioButtons"},o.a.createElement("input",{type:"radio",name:"institution",id:"university",className:"radioButtonDot",value:"4bf58dd8d48988d1ae941735",onChange:this.handleChange,checked:"4bf58dd8d48988d1ae941735"===this.state.institution,tabIndex:"4"}),o.a.createElement("label",{className:"radioButtonLabel",htmlFor:"university"},"University"),o.a.createElement("input",{type:"radio",name:"institution",id:"college",className:"radioButtonDot",value:"4bf58dd8d48988d1a2941735",onChange:this.handleChange,checked:"4bf58dd8d48988d1a2941735"===this.state.institution,tabIndex:"4"}),o.a.createElement("label",{className:"radioButtonLabel",htmlFor:"college"},"College"),o.a.createElement("input",{type:"radio",name:"institution",id:"trade",className:"radioButtonDot",value:"4bf58dd8d48988d1ad941735",onChange:this.handleChange,checked:"4bf58dd8d48988d1ad941735"===this.state.institution,tabIndex:"4"}),o.a.createElement("label",{className:"radioButtonLabel",htmlFor:"trade"},"Trade School")),o.a.createElement("label",{className:"userInputLabel",htmlFor:"search"},"Schools Near:"),o.a.createElement("input",{className:"userInput",type:"text",name:"userInput",id:"search",onChange:this.handleChange,value:this.state.userInput,tabIndex:"5",placeholder:"enter a city"}),o.a.createElement("label",{htmlFor:"submit",className:"visuallyHidden"},"Submit Search"),o.a.createElement("input",{className:"generalButton",type:"submit",id:"submit",value:"Get Schools List",tabIndex:"6"})))),o.a.createElement(B,{schoolsList:this.state.schoolsList,setBookmarkState:this.setBookmarkState,userSelectSchoolId:this.userSelectSchoolId}))}}]),t}(n.Component);var L=function(){return o.a.createElement("header",null,o.a.createElement("nav",{className:"nav"},o.a.createElement("div",{className:"wrapper"},o.a.createElement(u.b,{to:"/",className:"navLink",tabIndex:"1"},o.a.createElement("h1",null,"College Navigator")),o.a.createElement("ul",{className:"navList"},o.a.createElement("li",{className:"navItem"},o.a.createElement(u.b,{to:"/",className:"navLink",tabIndex:"2"},"Search")),o.a.createElement("li",{className:"navItem"},o.a.createElement(u.b,{to:"/notes",className:"navLink",tabIndex:"3"},"Bookmarks"))),o.a.createElement("ul",{className:"hiddenNavList"},o.a.createElement("li",{className:"navItem"},o.a.createElement(u.b,{to:"/",className:"navLink","aria-label":"search",tabIndex:"2"},o.a.createElement("i",{className:"fas fa-search"}))),o.a.createElement("li",{className:"navItem"},o.a.createElement(u.b,{to:"/notes",className:"navLink",tabIndex:"3","aria-label":"bookmarks"},o.a.createElement("i",{className:"fas fa-clipboard-list"})))))))},D=a(46),F=a.n(D),M=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleChange=function(t){e.setState(Object(p.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){(e.setState({id:F.a.v4()}),""!==e.state.name&&""!==e.state.address&&!1===/^\s*$/.test(e.state.name)&&!1===/^\s*$/.test(e.state.address)&&""!==e.state.category)?(N.a.database().ref().push(e.state),e.setState({name:"",address:"",note:"",category:"",id:""})):g()({title:"oops",text:"please enter required fields",icon:"warning"});t.preventDefault()},e.state={name:"",address:"",note:"",category:"",id:""},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"wrapper"},o.a.createElement("form",{className:"inputSchoolForm singleContent",onSubmit:this.handleSubmit},o.a.createElement("div",{className:"inputFieldContainer"},o.a.createElement("label",{htmlFor:"inputSchoolName"},"Name of Institution:"),o.a.createElement("input",{type:"text",placeholder:"Name",id:"inputSchoolName",className:"inputSchoolName",name:"name",value:this.state.name,onChange:this.handleChange})),o.a.createElement("div",{className:"inputFieldContainer"},o.a.createElement("label",{htmlFor:"inputSchoolAddress"},"Address:"),o.a.createElement("input",{type:"text",placeholder:"Address",id:"inputSchoolAddress",className:"inputSchoolAddress",name:"address",value:this.state.address,onChange:this.handleChange})),o.a.createElement("fieldset",{className:"inputFieldContainerRadio"},o.a.createElement("legend",{className:"visuallyHidden"},"Category:"),o.a.createElement("input",{className:"radioButtonDot",type:"radio",name:"category",id:"radioButtonCollege",value:"College",onChange:this.handleChange,checked:"College"===this.state.category}),o.a.createElement("label",{htmlFor:"radioButtonCollege",className:"radioButtonLabel"},"College"),o.a.createElement("input",{className:"radioButtonDot",type:"radio",name:"category",id:"universityButtonCollege",value:"University",onChange:this.handleChange,checked:"University"===this.state.category}),o.a.createElement("label",{htmlFor:"universityButtonCollege",className:"radioButtonLabel"},"University"),o.a.createElement("input",{className:"radioButtonDot",type:"radio",name:"category",id:"radioButtonTrade",value:"Trade School",onChange:this.handleChange,checked:"Trade School"===this.state.category}),o.a.createElement("label",{htmlFor:"radioButtonTrade",className:"radioButtonLabel"},"Trade School")),o.a.createElement("div",{className:"inputFieldContainer"},o.a.createElement("label",{htmlFor:"inputSchoolNote"},"Note (optional):"),o.a.createElement("textarea",{id:"inputSchoolNote",placeholder:"Note",className:"inputSchoolNote",name:"note",value:this.state.note,onChange:this.handleChange})),o.a.createElement("label",{htmlFor:"inputSchoolSubmit",className:"visuallyHidden"},"Submit"),o.a.createElement("input",{type:"submit",id:"inputSchoolSubmit",className:"inputSchoolSubmit generalButton",value:"Save"})))}}]),t}(n.Component),A=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleChange=function(t){e.setState(Object(p.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){var a=v.database().ref(e.state.selectedId);""!==e.state.userName&&a.child("name").set(e.state.userName),""!==e.state.userAddress&&a.child("address").set(e.state.userAddress),""!==e.state.userCategory&&a.child("category").set(e.state.userCategory),""!==e.state.userNote&&void 0!==e.state.userNote&&a.child("note").set(e.state.userNote),e.closeModal(),e.setState({userNote:"",userAddress:"",userName:"",userCategory:""}),t.preventDefault()},e.editNote=function(t){var a=e.state.bookmarkList.find(function(e){return e.key===t});e.setState({modalOpen:"open",selectedId:t,userName:a.name,userAddress:a.address,userNote:a.note,userCategory:a.category})},e.removeBookmark=function(e){v.database().ref(e).remove()},e.closeModal=function(){e.setState({modalOpen:"close"})},e.handleScroll=function(){Object(k.a)(".inputSchoolForm",{duration:1e3,a11y:!0})},e.focusHere=o.a.createRef(),e.state={bookmarkList:[],userNote:"",userName:"",userAddress:"",userCategory:"",modalOpen:"close",selectedId:""},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(){this.focusHere.current.focus()}},{key:"componentDidMount",value:function(){var e=this;v.database().ref().on("value",function(t){var a=t.val(),n=[];for(var o in a)n.push({key:o,name:a[o].name,address:a[o].address,id:a[o].id,note:a[o].note,category:a[o].category});e.setState({bookmarkList:n})})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"noteContainer"},o.a.createElement("div",{className:"wrapper"},o.a.createElement("div",{className:"bookmarks"},o.a.createElement("h2",null,"BOOKMARKS")),o.a.createElement("button",{onClick:this.handleScroll,className:"addSign"},o.a.createElement("i",{className:"fas fa-plus","aria-hidden":"true"}),o.a.createElement("p",null,"Add Institution"))),o.a.createElement("div",{className:"modalWrapper ".concat(this.state.modalOpen)},o.a.createElement("div",{className:"detailsOverlay"}),o.a.createElement("div",{className:"detailsModal"},o.a.createElement("button",{onClick:this.closeModal,className:"closeButton"},o.a.createElement("i",{className:"fas fa-times","aria-label":"close modal"})),o.a.createElement("form",{action:"",className:"editForm",onSubmit:this.handleSubmit},o.a.createElement("label",{htmlFor:"name"},"Name of Institution:"),o.a.createElement("input",{type:"text",id:"name",name:"userName",onChange:this.handleChange,value:this.state.userName,ref:this.focusHere}),o.a.createElement("label",{htmlFor:"address"},"Address:"),o.a.createElement("input",{type:"text",id:"address",name:"userAddress",onChange:this.handleChange,value:this.state.userAddress}),o.a.createElement("fieldset",{className:"inputFieldContainerRadio"},o.a.createElement("legend",{className:"visuallyHidden"},"Category:"),o.a.createElement("input",{className:"radioButtonDot",type:"radio",name:"userCategory",id:"college",value:"College",onChange:this.handleChange}),o.a.createElement("label",{htmlFor:"college"},"College"),o.a.createElement("input",{className:"radioButtonDot",type:"radio",name:"userCategory",id:"university",value:"University",onChange:this.handleChange}),o.a.createElement("label",{htmlFor:"university"},"University"),o.a.createElement("input",{className:"radioButtonDot",type:"radio",name:"userCategory",id:"tradeSchool",value:"Trade School",onChange:this.handleChange}),o.a.createElement("label",{htmlFor:"tradeSchool"},"Trade School")),o.a.createElement("label",{htmlFor:"addNote"},"Add Note"),o.a.createElement("textarea",{onChange:this.handleChange,value:this.state.userNote,name:"userNote"}),o.a.createElement("input",{className:"generalButton",type:"submit",value:"enter"})))),o.a.createElement("ul",{className:"notes wrapper"},this.state.bookmarkList.map(function(t){return o.a.createElement("li",{key:t.key,className:"singleNote singleContent",tabIndex:"0"},o.a.createElement("div",{className:"textWrapper"},o.a.createElement("p",{className:"schoolName"},"Institution: ",t.name),o.a.createElement("p",{className:"address"}," Address: ",t.address),o.a.createElement("p",{className:"category"},"Category: ",t.category),o.a.createElement("p",{className:"note"}," Note: ",t.note)),o.a.createElement("button",{className:"generalButton",onClick:function(){e.editNote(t.key)}},o.a.createElement("i",{className:"fas fa-pen","aria-hidden":"true"}),"Edit"),o.a.createElement("button",{className:"generalButton",onClick:function(){e.removeBookmark(t.key)}},o.a.createElement("i",{className:"fas fa-trash-alt","aria-hidden":"true"}),"Delete"))}),o.a.createElement(S.CircleArrow,{AnimationDuration:500,ShowAtPosition:350,style:{fill:"#073330",height:30,width:30,right:15,border:"3px solid #073330",background:"rgba(255, 255, 255, 0.848)"}})),o.a.createElement(M,null))}}]),t}(n.Component);var V=function(){return o.a.createElement("footer",null,o.a.createElement("p",null,"Powered! by"," ",o.a.createElement("a",{href:"https://developer.foursquare.com/",target:"_blank",rel:"noopener noreferrer"},"Foursquare API")),o.a.createElement("p",null,"Made by Andrew, David, Frankie and Jasmine"))},U=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(u.a,null,o.a.createElement(L,null),o.a.createElement(h.a,{exact:!0,path:"/",component:O}),o.a.createElement(h.a,{path:"/notes",component:A}),o.a.createElement(V,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[47,1,2]]]);
//# sourceMappingURL=main.a6a3694c.chunk.js.map