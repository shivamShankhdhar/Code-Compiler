var editor = CodeMirror.fromTextArea(document.getElementById("editor"),{
  mode: "text/x-c++src",
  theme: "blackboard",
  lineNumbers:true,
  autoCloseBrackets:true,

});
var width = window.innerWidth;
editor.setSize(0.52*width,"480");
    // theme list from array 
    let selectList = document.getElementById("selectTheme");
    let items = themeList.sort(); 
    for(var i in items) {
      var option = document.createElement("option");
      option.value = items[i];
      option.text = items[i];
      if(items[i] === "blackboard"){
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

    let input     = document.getElementById("input-textarea");
    let output    = document.getElementById("output-textarea");
    let runButton = document.getElementById("run-button");
    var code;

    runButton.addEventListener("click",async function(){
      
      code = {
        "code":editor.getValue(),
        "input":input.value,
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
    console.log("code copy btn clicked");
    var copyText = editor.getValue();

    copyText.select;
    //copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    // Alert the copied text
    alert("Code Copied");
  });

//reset code editor according to selected language
let resetCodeButton = document.getElementById("resetCodeButton");
resetCodeButton.addEventListener("click",()=>{
if(selectLanguage.value === "PYTHON"){
  let v = 'print("Hello World!");';
  editor.setOption("value"," "); 
  editor.setOption("value",v); 
}
});