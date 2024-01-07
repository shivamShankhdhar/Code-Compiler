const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compiler = require("compilex");
const options = {stats:true};
compiler.init(options);

app.use(bodyParser.json());
app.use("/static/css",express.static("D:/Projects/CodeEditor/static/css"));
app.use("/static/js",express.static("D:/Projects/CodeEditor/static/js/"));

app.use("/codemirror",express.static("D:/Projects/CodeEditor/codemirror"));
app.get("/v-1.0/",function(req, res){
  compiler.flush(function(){
    console.log("All temerory files has been deleted");
  })
  res.sendFile("D:/Projects/CodeEditor/index.html");
});

app.post("/compile",function(req,res){

   let code = req.body.code;
   let input = req.body.input;
   let lang = req.body.lang;
  
     //if windows  
     var envData = { OS : "windows"}; 
     //else
     //var envData = { OS : "linux" }; 
    try {
       if(lang === "C++"){
        if(!input){
          
              //if windows  
    var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , code , function (data) {
        if(data.output){
  res.send(data);
}else{
  res.send({output:"Error"})
};
        //data.Error = Error message 
        //data.output = output value
    });
    
    //res is the response object

        }else{

              //if windows  
          var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
          //else
          var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
          compiler.compileCPPWithInput(envData , code , input , function (data) {
          if(data.output){
  res.send(data);
}else{
  res.send({output:"Error"})
};
    });

        }
       }
       else if(lang == "JAVA"){
          if(!input){
                  //if windows  
            var envData = { OS : "windows"}; 
            //else
            var envData = { OS : "linux" }; // (Support for Linux in Next version)
            compiler.compileJava( envData , code , function(data){
            if(data.output){
  res.send(data);
}else{
  res.send({output:"Error"})
};
    });                
          }else{
                //if windows  
            var envData = { OS : "windows"}; 
            //else
            var envData = { OS : "linux" }; // (Support for Linux in Next version)
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
            if(data.output){
  res.send(data);
}else{
  res.send({output:"Error"})
};
            });
          }
       }

      //  python 
      else if(lang == "PYTHON"){
        if(!input){
              //if windows  
          var envData = { OS : "windows"}; 
          //else
          // var envData = { OS : "linux" }; 
          compiler.compilePython( envData , code , function(data){
          if(data.output){
            res.send(data);
          }else{
            res.send({output:"Error"});
            
          };
    });    
        }else{
              //if windows  
          var envData = { OS : "windows"}; 
          //else
          // var envData = { OS : "linux" }; 
          compiler.compilePythonWithInput( envData , code , input ,  function(data){
          if(data.output){
            res.send(data);
          }else{
            res.send({output:"Error"})
};        
    });
        }
      }

      // C# 
      else if (lang == "C#"){
        if(!input){
          var envData = { OS : "windows"}; 
          //mono modules for linux is not included till now
          compiler.compileCS( envData , code , function(data){
          if(data.output){
            res.send(data);
          }else{
            res.send({output:"Error"})
          };
          });    
        }else{
          
          var envData = { OS : "windows"}; 
          //mono modules for linux is not included till now
          compiler.compileCSWithInput( envData , code , input ,  function(data){
          if(data.output){
          res.send(data);
        }else{
          res.send({output:"Error"})
        };        
    });
        }
      }
    } catch (Error) {
      console.log("Error");
    }   
});
app.listen(8000);