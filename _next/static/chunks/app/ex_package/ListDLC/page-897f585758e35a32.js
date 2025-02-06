(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[656],{708:function(e,t,a){Promise.resolve().then(a.bind(a,5468))},9376:function(e,t,a){"use strict";var n=a(5475);a.o(n,"useRouter")&&a.d(t,{useRouter:function(){return n.useRouter}})},4100:function(e,t,a){"use strict";a.d(t,{Z:function(){return l}});var n=a(7437),i=a(7648),s=a(3145);function l(){return(0,n.jsx)("nav",{className:"fixed top-0 left-0 w-full bg-bgNav text-white p-4 z-20",children:(0,n.jsxs)("div",{className:"container mx-auto flex justify-between items-center",children:[(0,n.jsx)(i.default,{href:"/",className:"text-lg font-semibold px-2 ",children:(0,n.jsx)(s.default,{src:"/logo.PNG",alt:"Picture of the author",width:50,height:50})}),(0,n.jsxs)("div",{className:"flex space-x-4",children:[(0,n.jsx)("div",{className:"relative",children:(0,n.jsx)(i.default,{href:"/ex_package/Summary",children:(0,n.jsx)("button",{className:"hover:border-b-2 border-white px-2 py-2 font-semibold",children:"Xuất h\xe0ng"})})}),(0,n.jsx)("div",{className:"relative",children:(0,n.jsx)(i.default,{href:"/im_package/AddProduct",children:(0,n.jsx)("button",{className:"hover:border-b-2 border-white px-2 py-2 font-semibold",children:"Nhập h\xe0ng"})})}),(0,n.jsx)("div",{className:"relative",children:(0,n.jsx)(i.default,{href:"/Inventory",children:(0,n.jsx)("button",{className:"hover:border-b-2 border-white px-2 py-2 font-semibold",children:"Kho h\xe0ng"})})})]})]})})}},5468:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return h}});var n=a(7437),i=a(2265),s=a(9376),l=a(1269),r=a(4100),o=a(7648),c=a(3145),d=a(4720);function h(){let[e,t]=(0,i.useState)(""),[a,h]=(0,i.useState)(!1),[u,m]=(0,i.useState)(null),[x,p]=(0,i.useState)(!1),[b,j]=(0,i.useState)(null),[y,v]=(0,i.useState)([]),g=(0,s.useRouter)(),[N,f]=(0,i.useState)([]),[w,C]=(0,i.useState)(""),[S,E]=(0,i.useState)(null),[A,k]=(0,i.useState)(!0),T={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:1}}},I={hidden:{opacity:0,x:-20},visible:e=>({opacity:1,x:0,transition:{delay:.1*e,duration:.8}})};function P(e){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",a="";for(let n=0;n<e;n++)a+=t.charAt(Math.floor(Math.random()*t.length));return a}let[L,O]=(0,i.useState)({ten:"",ma:"",diaChi:"",phone:""}),[_,R]=(0,i.useState)([]);(0,i.useEffect)(()=>{let e=localStorage.getItem("exportedItems"),t=localStorage.getItem("receiptCode");e&&f(JSON.parse(e)),t&&C(t)},[]),(0,i.useEffect)(()=>{(async()=>{try{let e=await fetch("http://localhost:3000/daily");if(!e.ok)throw Error("Network response was not ok");let t=await e.json();v(t)}catch(e){E(e)}finally{k(!1)}})()},[]);let q=y.filter(t=>{var a;return t.ten.toLowerCase().includes(e.toLowerCase())||(null===(a=t.number)||void 0===a?void 0:a.includes(e))||t.ma.includes(e)||t.diaChi.toLowerCase().includes(e.toLowerCase())||t.phone.includes(e)}),D=async e=>{e.preventDefault();let t={number:((y.length?Math.max(...y.map(e=>parseInt(e.number,10))):0)+1).toString(),ten:L.ten,ma:P(8),diaChi:L.diaChi,phone:L.phone,goods:[]};try{let e=await fetch("http://localhost:3000/daily/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw Error("Kh\xf4ng thể th\xeam đại l\xfd!");let a=await e.json();console.log("Đại l\xfd đ\xe3 được lưu:",a),v(e=>[...e,t]),window.location.reload(),h(!1),O({ten:"",diaChi:"",phone:""})}catch(e){console.error("Lỗi khi th\xeam đại l\xfd:",e),alert("Đ\xe3 xảy ra lỗi khi th\xeam đại l\xfd!")}},H=e=>{j(e),O({ten:e.ten,diaChi:e.diaChi,phone:e.phone}),p(!0)},M=async e=>{e.preventDefault();try{if(!(await fetch("http://localhost:3000/daily/edit/".concat(b.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(L)})).ok)throw Error("Unable to edit dealer!");v(e=>e.map(e=>e.id===b.id?{...e,...L}:e)),p(!1),window.location.reload()}catch(e){console.error("Error editing dealer:",e),alert("An error occurred while editing the dealer!")}},Q=async e=>{if(window.confirm("Are you sure you want to delete this dealer?"))try{if(!(await fetch("http://localhost:3000/daily/".concat(e),{method:"DELETE"})).ok)throw Error("Failed to delete dealer");v(t=>t.filter(t=>t.id!==e))}catch(e){console.error("Error deleting dealer:",e),alert("Giao dịch với đại l\xfd n\xe0y đang được xử l\xfd, kh\xf4ng thể x\xf3a!")}},U=e=>{e.target===e.currentTarget&&(h(!1),p(!1))},X=e=>{m(u===e?null:e)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.Z,{}),(0,n.jsx)(c.default,{alt:"Mountains",src:d.Z,placeholder:"blur",quality:100,sizes:"100vw",style:{objectFit:"cover",position:"fixed"},className:"blur-sm absolute w-screen h-screen"}),(0,n.jsxs)("div",{className:"pt-20 relative",children:[(0,n.jsx)(l.E.h1,{className:"text-2xl text-blue-500 font-bold my-4 text-center",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:"Danh s\xe1ch h\xe0ng xuất"}),0===N.length?(0,n.jsx)(l.E.p,{className:"text-center",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:"Kh\xf4ng c\xf3 h\xe0ng n\xe0o được xuất."}):(0,n.jsx)(l.E.div,{className:"overflow-x-auto",initial:"hidden",animate:"visible",variants:T,children:(0,n.jsxs)("table",{className:"min-w-full border-collapse border border-gray-200 mx-auto",children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{className:"name-data-inventory",children:"STT"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"M\xe3 phiếu xuất"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"M\xe3 h\xe0ng"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"T\xean h\xe0ng"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"Số lượng"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"Gi\xe1"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"Tổng gi\xe1"})]})}),(0,n.jsx)("tbody",{children:N.map((e,t)=>{let a=e.soLuong*e.giaNhap;return(0,n.jsxs)(l.E.tr,{custom:t,initial:"hidden",animate:"visible",variants:I,className:"hover:bg-blue-100",children:[(0,n.jsx)("td",{className:"data-inventory",children:t+1}),(0,n.jsx)("td",{className:"data-inventory",children:w}),(0,n.jsx)("td",{className:"data-inventory",children:e.ma}),(0,n.jsx)("td",{className:"data-inventory",children:e.ten}),(0,n.jsx)("td",{className:"data-inventory",children:e.soLuong}),(0,n.jsxs)("td",{className:"data-inventory",children:[e.giaNhap.toLocaleString()," VNĐ"]}),(0,n.jsxs)("td",{className:"data-inventory",children:[a.toLocaleString()," VNĐ"]})]},t)})})]})})]}),(0,n.jsxs)(l.E.div,{className:"pt-10 relative",initial:"hidden",animate:"visible",variants:T,children:[(0,n.jsx)(l.E.h1,{className:"flex justify-center text-2xl text-blue-700 py-4 font-bold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:"Quản l\xfd c\xe1c đại l\xfd con"}),(0,n.jsx)("div",{className:"mb-4",children:(0,n.jsx)("input",{type:"text",placeholder:"T\xecm kiếm đại l\xfd...",value:e,onChange:e=>t(e.target.value),className:"box-input-export"})}),(0,n.jsxs)("div",{className:"mb-4 flex justify-center items-center space-x-4",children:[(0,n.jsx)(l.E.button,{onClick:()=>h(!0),className:"style-button w-[25%]",whileHover:{scale:1.05},whileTap:{scale:.95},children:"Th\xeam đại l\xfd"}),(0,n.jsx)(l.E.button,{onClick:()=>{if(!u){alert("Vui l\xf2ng chọn \xedt nhất một đại l\xfd để xuất h\xe0ng.");return}let e=y.find(e=>e.id===u);if(console.log("selectedDealer",e),!e){alert("Kh\xf4ng t\xecm thấy th\xf4ng tin đại l\xfd.");return}let{ten:t,diaChi:a,phone:n}=e,i=P(8);console.log("ma",i),console.log("maPhieuXuat",w);let s={ma:i,ten:t,diaChi:a,phone:n,danhSachPhieuXuat:[{maPhieuXuat:w}]};console.log("data",s),fetch("http://localhost:3000/daily/add-dai-ly/-phieu-xuat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then(e=>{if(console.log("API response status:",e.status),!e.ok)throw Error("Network response was not ok");return e.json()}).then(e=>{console.log("API response",e),g.push("/ex_package/BillExport")}).catch(e=>{console.error("Error:",e.message),alert("Lỗi hệ thống: "+e.message)})},className:"style-button w-[25%]",whileHover:{scale:1.05},whileTap:{scale:.95},children:"Xuất h\xe0ng cho đại l\xfd"}),(0,n.jsx)(l.E.div,{whileHover:{scale:1.05},whileTap:{scale:.95},children:(0,n.jsx)(o.default,{href:"/ex_package/BillExport",children:(0,n.jsx)("button",{className:"style-button",children:"Xem h\xf3a đơn xuất h\xe0ng tại đ\xe2y"})})})]}),a&&(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10",onClick:U,children:(0,n.jsxs)("form",{onSubmit:D,className:"bg-white p-6 rounded shadow-md w-[90%] max-w-md",children:[(0,n.jsx)("h2",{className:"title-form",children:"Th\xeam đại l\xfd mới"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"title-input",children:"T\xean đại l\xfd:"}),(0,n.jsx)("input",{type:"text",value:L.ten,onChange:e=>O({...L,ten:e.target.value}),className:"box-input-export",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"title-input",children:"Địa chỉ:"}),(0,n.jsx)("input",{type:"text",value:L.diaChi,onChange:e=>O({...L,diaChi:e.target.value}),className:"box-input-export",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"title-input",children:"Số điện thoại:"}),(0,n.jsx)("input",{type:"text",value:L.phone,onChange:e=>O({...L,phone:e.target.value}),className:"box-input-export",required:!0})]}),(0,n.jsx)("div",{className:"mt-4",children:(0,n.jsx)("button",{type:"submit",className:"flex mx-auto justify-center style-button",children:"Th\xeam đại l\xfd"})})]})}),x&&(0,n.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10",onClick:U,children:(0,n.jsxs)("form",{onSubmit:M,className:"bg-white p-6 rounded shadow-md w-[90%] max-w-md",children:[(0,n.jsx)("h2",{className:"text-2xl font-bold mb-4 text-center",children:"Sửa đại l\xfd"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block mb-1",children:"T\xean đại l\xfd:"}),(0,n.jsx)("input",{type:"text",value:L.ten,onChange:e=>O({...L,ten:e.target.value}),className:"box-input-export",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block mb-1",children:"Địa chỉ:"}),(0,n.jsx)("input",{type:"text",value:L.diaChi,onChange:e=>O({...L,diaChi:e.target.value}),className:"box-input-export",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block mb-1",children:"Số điện thoại:"}),(0,n.jsx)("input",{type:"text",value:L.phone,onChange:e=>O({...L,phone:e.target.value}),className:"box-input-export",required:!0})]}),(0,n.jsx)("div",{className:"mt-4",children:(0,n.jsx)("button",{type:"submit",className:"style-button",children:"Cập nhật đại l\xfd"})})]})}),(0,n.jsxs)(l.E.table,{className:"min-w-full border-collapse border border-gray-200",initial:"hidden",animate:"visible",variants:T,children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{className:"name-data-inventory",children:"Chọn"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"STT"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"T\xean đại l\xfd"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"Địa chỉ"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"SĐT"}),(0,n.jsx)("th",{className:"name-data-inventory",children:"H\xe0nh động"})]})}),(0,n.jsx)("tbody",{children:q.map((e,t)=>(0,n.jsxs)(l.E.tr,{custom:t,initial:"hidden",animate:"visible",variants:I,className:"hover:bg-blue-100",children:[(0,n.jsx)("td",{className:"name-data-inventory text-center",children:(0,n.jsx)("input",{type:"checkbox",checked:u===e.id,onChange:()=>X(e.id)})}),(0,n.jsx)("td",{className:"data-inventory",children:t+1}),(0,n.jsx)("td",{className:"data-inventory",children:e.ten}),(0,n.jsx)("td",{className:"data-inventory",children:e.diaChi}),(0,n.jsx)("td",{className:"data-inventory",children:e.phone}),(0,n.jsx)("td",{className:"data-inventory",children:(0,n.jsxs)("div",{className:"flex justify-center space-x-2",children:[(0,n.jsx)(l.E.button,{onClick:()=>H(e),className:"style-button",whileHover:{scale:1.05},whileTap:{scale:.95},children:"Sửa"}),(0,n.jsx)(l.E.button,{onClick:()=>Q(e.id),className:"style-button",whileHover:{scale:1.05},whileTap:{scale:.95},children:"X\xf3a"})]})})]},e.number))})]})]})]})}},4720:function(e,t){"use strict";t.Z={src:"/_next/static/media/Baixar-fundo-abstrato-hex\xe1gono_-conceito-poligonal-de-tecnologia-gratuitamente.c3777ead.png",height:368,width:736,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAATUlEQVR42h3JSQ7AIAwDQCdE9P8P7aIeQIhgd5nrWOs9Ioq7mQGQtMg5M1JW/YPf2xTOqbjnGmY1isitFIj7yCsZLbl8HUkDAwlRcIcebEcveohQeW0AAAAASUVORK5CYII=",blurWidth:8,blurHeight:4}}},function(e){e.O(0,[891,971,117,744],function(){return e(e.s=708)}),_N_E=e.O()}]);