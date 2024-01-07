
var editor = CodeMirror.fromTextArea(document.getElementById("editor"),{
  mode: "text/x-c++src",
  lineNumbers:true,
  autoCloseBrackets:true,

});
// editor value global variable 



var width = window.innerWidth;
editor.setSize(0.48*width,"480");
    // theme list from array 
    let selectList = document.getElementById("selectTheme");
    let items = themeList.sort(); 
    for(var i in items) {
      var option = document.createElement("option");
      option.value = items[i];
      option.text = items[i];
      if(items[i] === "eclipse"){
        option.setAttribute("selected",true);
      }
      selectList.appendChild(option);
    }      
      // select theme based on the select theme option 
        function selectedThemeOnChange (){
          var selectedTheme = document.getElementById("selectTheme").value;
          editor.setOption("theme",selectedTheme)
          
        }

    let selectLanguage = document.getElementById("selectLanguage");
    let programmingLanguage = programmingLanguageList.sort(); 
    for(var i in programmingLanguageList) {
      var option   = document.createElement("option");
      option.value = programmingLanguage[i];
      option.text  = programmingLanguage[i];
      selectLanguage.appendChild(option);
    }   

    function selectLanguageChangeValue (){
          // var selectLanguage = document.getElementById("selectLangauge");
          if(selectLanguage.value === "JAVA"){
            editor.setOption("mode","text/x-java");
          }else if(selectLanguage.value === "PYTHON"){
            let value = `print("Hello World!");`
            editor.setOption("value",value); 
            editor.setOption("mode","text/x-java");
          }else{
            editor.setOption("mode","text/x-c++src");
          }
        }
    //  connecting api with frontend 

    // let input     = document.getElementById("input-textarea");
    let output    = document.getElementById("output-textarea");
    let runButton = document.getElementById("run-button");
    var code;
    
    runButton.addEventListener("click",async function(){
      let copyText = editor.getValue();
      code = {
        "code":editor.getValue(),
        "lang":selectLanguage.value,
      };
      var oData=await fetch("http://localhost:8000/compile",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(code)
      })
      
      var d=await oData.json();
      output.value = d.output;
      
    });
    
  let copyCodeBtn = document.getElementById("copyCodeButton");
  copyCodeBtn.addEventListener("click", () => {
    let copyText = editor.getValue();
    if(copyText.length > 0){
    copyText.select;
    //copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    // Alert the copied text
    alert("Code Copied");
    }else{
      alert("Please Enter Some Code to Copy, Happy Coding!");
    }
  });

//reset code editor according to selected language
let resetCodeButton = document.getElementById("resetCodeButton");
resetCodeButton.addEventListener("click",()=>{
  if(selectLanguage.value === "PYTHON"){
    let copyText = editor.getValue();
    if(copyText.length > 0){
      let v = 'print("Hello World!");';
      editor.setOption("value"," "); 
      editor.setOption("value",v); 
    }else{
      alert("There is already no code in the Editor, Happy Coding!");
    }
  }
});