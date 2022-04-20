window.MathJax = {
    loader: { load: ['input/asciimath', 'output/chtml'] },
     
    asciimath: {
      delimiters: [
        ['$$', '$$'],
        ['`', '`']
      ]
    }
  };
  
  //
  //  Load MathJax:
  //
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js';
  script.setAttribute('id', 'MathJax-script');
  document.head.appendChild(script);

function rendereq(eq){
    let output=$("#output");
    let submit = $('#submit');
    let input = $(eq);
      

        output.html(`\``+input.val()+`\``);
    
        MathJax.typesetClear();
        MathJax.typeset();
    
}
/*

$("#result").append("<div class=\"row mt-1\"style=\"display:none; \"><div class=\"col bg-danger text-white text-center otp\" >\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div></div> ");
$("#result").append("<div class=\"row mt-1\"><div class=\"col bg-danger text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div></div> ");
$("#result").append("<div class=\"row mt-1\"><div class=\"col bg-danger text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div></div> ");
$("#result").append("<div class=\"row mt-1\"><div class=\"col bg-danger text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div></div> ");
$("#result").append("<div class=\"row mt-1\"><div class=\"col bg-danger text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+1+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+1+"\`</div></div> ");*/

