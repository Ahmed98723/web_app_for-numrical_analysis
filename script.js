/* preloader animation   */

var c = document.getElementById('matrix');
var cxt = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;



var chinese = "∜∑/*-+^∝√∛±~×÷϶⁼∂∉≤≥";
chinese = chinese.split("");

var font_size =50;
var columns = c.width/font_size; 

var drops = [];

for(var x=0;x<columns;x++){
  drops[x]=1;
}

function draw(){
  cxt.fillStyle="rgba(255,255,255,0.05)";
  cxt.fillRect(0,0,c.width,c.height);
  
  cxt.fillStyle = "#000";
  cxt.font = font_size+'px arial';
  
  
  for(var i=0;i<drops.length;i++){
    var text = chinese[Math.floor(Math.random()*chinese.length)];
    cxt.fillText(text,i*font_size,drops[i]*font_size);
    
    if(drops[i]*font_size>c.height && Math.random() >0.975)
      drops[i]=0;
    
    //increment y coordinate
    drops[i]++;
}
  
}
setInterval(draw,50);
/* preloader animation   */
/* algorithm*/
function bisection()
{
    $("#result .d").remove();
    $(".algo input").removeClass("invalid");
    var xu= $("#bxu").val();
    var xl=$("#bxl").val();
    var erp=$("#bierror").val();
    var eq=$("#beq").val();
    var e = nerdamer(eq);
    var variables = e.variables();
    
    var err=[];
    if(!$.isNumeric(xu)){
        err[0]="error in xu";
        $("#bxu").addClass("invalid");

    }
    if(!$.isNumeric(xl)){
        err[1]="error in xl";
        $("#bxl").addClass("invalid");
        
    }
    if(!(variables.length==1 && variables.find(function(e){return e=='x';})=='x')){
        err[2]="error in eq";
        $("#beq").addClass("invalid");
    }

    if($("#bichecktoit").is(':checked')){
        if(!($.isNumeric(erp)&& Number(erp)>0)){
            err[3]="error in erp";
            $("#bierror").addClass("invalid");
        } 

    }else{
        if(!($.isNumeric(erp)&& Number(erp)>=0 && Number(erp)<=100)){
            err[3]="error in erp";
            $("#bierror").addClass("invalid");
        } 
    } 
    for(var i=0;i<err.length;i++){
        console.log(err[i]);
        if((err.length-i)==1){
            MathJax.typesetClear();
            return 0; }
    }
    rendereq("#beq");
    erp=Number(erp);
    xu=Number(xu);
    xl=Number(xl);
    fxu=nerdamer(eq,{x:xu});
    fxu=Number(fxu);
    fxl=nerdamer(eq,{x:xl});
    fxl=Number(fxl);
    console.log(fxu+" "+fxl);
    if(!(fxu*fxl<0)){
        console.log("limiters are not correct");
        return 0;
    }
   
    var erc;
    var itration =0;
    var xrn,xro,fxr;
    var matrix=[];
    var b=true;
    
    do{
        console.log(itration);
        
        if(itration==0){
            xrn=(xl+xu)/2;
            xro=xrn;
            fxr=nerdamer(eq,{x:xrn});
            fxr=Number(fxr);
            matrix[itration]=[itration,xl.toFixed(3),fxl.toFixed(3),xu.toFixed(3),fxu.toFixed(3),xrn.toFixed(3),fxr.toFixed(3),"---"];
            if(fxr*fxl<0){
                xu=xrn;
            }else{
                xl=xrn;
            }
            itration++;
            
        }else{
            xrn=(xl+xu)/2;
            erc=Math.abs((xrn-xro)/xrn)*100;
           
            fxr=nerdamer(eq,{x:xrn});
            fxr=Number(fxr);
            
            matrix[itration]=[itration,xl.toFixed(3),fxl.toFixed(3),xu.toFixed(3),fxu.toFixed(3),xrn.toFixed(3),fxr.toFixed(3),erc.toFixed(3)];
            
            if(fxr*fxl<0){
                xu=xrn;
            }else{
                xl=xrn;
            }
            xro=xrn;
            itration++;
            console.log(itration);
            if($("#bichecktoit").is(':checked'))
                b=(!(erp==itration))?true:false;
            else
                b=(!(erc<=erp))?true:false;
        }

    }while(b)  

    console.log(matrix);
    /* */
    $("#result").append("<div class=\"row d\"><div class=\"col bg-danger text-white text-center\">\`I\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{l\}\`</div><div class=\"col bg-success text-white text-center\">\`F\(X_\{l\}\)\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{U\}\`</div><div class=\"col bg-success text-white text-center\">\`F\(X_\{U\}\)\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{R\}\`</div><div class=\"col bg-success text-white text-center\">\`F\(X_\{R\}\)\`</div><div class=\"col bg-primary text-white text-center error\">\`\\varepsilon_e\`</div></div>  ");
 
    rendereq("#beq");
    for(var i; i<matrix.length;i++){
                
        
            $("#result").append("<div class=\"row mt-1 d r"+i+"\"style=\"display:none; \"><div class=\"col bg-danger text-white text-center otp\" >\`"+matrix[i][0]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][1]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][2]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][3]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][4]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][5]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][6]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][7]+"\`</div></div> ");
    
            $(".r"+i).fadeIn(2000);
      
    }
    rendereq("#beq");


    /* */

}


function simplefixed()
{
    $("#result .d").remove();
    $("input").removeClass("invalid");
    var x0 = $("#six0").val();
    var erp=$("#sierror").val();
    var eq=$("#sieq").val();
    var e = nerdamer(eq);
    var variables = e.variables();
    var err=[];
    if(!$.isNumeric(x0)){
        $("#six0").addClass("invalid");
        err[0]="error in x0";}
    if(!(variables.length==1 && variables.find(function(e){return e=='x';})=='x')){
        err[1]="error in eq";
        $("#sieq").addClass("invalid");
    }
    
    if($(" #sichecktoit").is(':checked')){
        if(!($.isNumeric(erp)&& Number(erp)>0)){
            err[2]="error in erp";
            $("#sierror").addClass("invalid");
        } 

    }else{
        if(!($.isNumeric(erp)&& Number(erp)>=0 && Number(erp)<=100)){
            err[2]="error in erp";
            $("#sierror").addClass("invalid");
        }  
    }   
    for(var i=0;i<err.length;i++){
        console.log(err[i]);
        if((err.length-i)==1){
            MathJax.typesetClear();
            return 0; }
    }
    
    erp=Number(erp);
    x0=Number(x0);

    var erc;
    var itration =0;
    var xin=x0,xio;
    var matrix=[];
    var b=true;
    
    do{
        console.log(itration);
        
        if(itration==0){
            xio=xin;
            fxin=math.evaluate(eq,{x:xin});
            fxin=Number(fxin);
            console.log(fxin);
            matrix[itration]=[itration,xin.toFixed(3),fxin.toFixed(3),"---"];
            xin=fxin;
            itration++;
            
        }else{
            
            erc=Math.abs((xin-xio)/xin)*100;
           
            fxin=math.evaluate(eq,{x:xin});
            fxin=Number(fxin);
            
            matrix[itration]=[itration,xin.toFixed(3),fxin.toFixed(3),erc.toFixed(3)];
            xio=xin;
            xin=fxin;
            itration++;
            if($(" #sichecktoit").is(':checked'))
                b=(!(erp==itration))?true:false;
            else
                b=(!(erc<=erp))?true:false;
            
            

        }

    }while(b)  

    console.log(matrix);
    
    $("#result").append("<div class=\" d row\"><div class=\"col  bg-danger text-white text-center\">\`I\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{i\}\`</div><div class=\"col bg-success text-white text-center\">\`F(X_\{i\}\)\`</div><div class=\"col bg-primary text-white text-center error\">\`\\varepsilon_e\`</div></div>");  
    
    
    for(var i; i<matrix.length;i++){

                
            
            $("#result").append("<div class=\"row d mt-1 r"+i+"\"style=\"display:none; \"><div class=\"col bg-danger text-white text-center otp\" >\`"+matrix[i][0]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][1]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][2]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][3]+"\`</div> ");
    
            $(".r"+i).fadeIn(2000);
      
    }
    rendereq("#sieq");

}
function falseposition()
{
    $("#result .d").remove();
    $("input").removeClass("invalid");
    var xu= $("#faxu").val();
    var xl=$("#faxl").val();
    var erp=$("#faerror").val();
    var eq=$("#faeq").val();
    var e = nerdamer(eq);
    var variables = e.variables();
    
    var err=[];
    if(!$.isNumeric(xu)){
        err[0]="error in xu";
        $("#faxu").addClass("invalid");
    }
    if(!$.isNumeric(xl)){
        err[1]="error in xl";
        $("#faxl").addClass("invalid");
        
    }
    if(!(variables.length==1 && variables.find(function(e){return e=='x';})=='x')){
        $("#faeq").addClass("invalid");
        err[2]="error in eq";
    }
    if($("#fachecktoit").is(':checked')){
        if(!($.isNumeric(erp)&& Number(erp)>0)){
            err[3]="error in erp";
            $("#faerror").addClass("invalid");
        } 

    }else{
        if(!($.isNumeric(erp)&& Number(erp)>=0 && Number(erp)<=100)){
            err[3]="error in erp";
            $("#faerror").addClass("invalid");
        } 
    }  
       
    for(var i=0;i<err.length;i++){
        console.log(err[i]);
        if((err.length-i)==1){
            MathJax.typesetClear();
            return 0; }
    }
    rendereq("#faeq");
    erp=Number(erp);
    xu=Number(xu);
    xl=Number(xl);
    fxu=nerdamer(eq,{x:xu});
    fxu=Number(fxu);
    fxl=nerdamer(eq,{x:xl});
    fxl=Number(fxl);
    console.log(fxu+" "+fxl);
    if(!(fxu*fxl<0)){
        console.log("limiters are not correct");
        return 0;
    }
   
    var erc;
    var itration =0;
    var xrn,xro,fxr;
    var matrix=[];
    var b=true;
    
    do{
        console.log(itration);
        
        if(itration==0){
            xrn=xu-((fxu*(xl-xu))/(fxl-fxu));
            xro=xrn;
            fxr=nerdamer(eq,{x:xrn});
            fxr=Number(fxr);
            matrix[itration]=[itration,xl.toFixed(3),fxl.toFixed(3),xu.toFixed(3),fxu.toFixed(3),xrn.toFixed(3),fxr.toFixed(3),"---"];
            if(fxr*fxl<0){
                xu=xrn;
            }else{
                xl=xrn;
            }
            itration++;
            
        }else{
            xrn = xu-((fxu*(xl-xu))/(fxl-fxu));
            erc = Math.abs((xrn-xro)/xrn)*100;
           
            fxr=nerdamer(eq,{x:xrn});
            fxr=Number(fxr);
            
            matrix[itration]=[itration,xl.toFixed(3),fxl.toFixed(3),xu.toFixed(3),fxu.toFixed(3),xrn.toFixed(3),fxr.toFixed(3),erc.toFixed(3)];
            
            if(fxr*fxl<0){
                xu=xrn;
            }else{
                xl=xrn;
            }
            xro=xrn;
            itration++;
            console.log(itration);
            if($("#fachecktoit").is(':checked'))
            b=(!(erp==itration))?true:false;
            else
            b=(!(erc<=erp))?true:false;
           

        }

    }while(b)  

    console.log(matrix);
    /* */
    

    $("#result").append("<div class=\"row d\"><div class=\"col bg-danger text-white text-center\">\`I\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{l\}\`</div><div class=\"col bg-success text-white text-center\">\`F\(X_\{l\}\)\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{U\}\`</div><div class=\"col bg-success text-white text-center\">\`F\(X_\{U\}\)\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{R\}\`</div><div class=\"col bg-success text-white text-center\">\`F\(X_\{R\}\)\`</div><div class=\"col bg-primary text-white text-center error\">\`\\varepsilon_e\`</div></div>  ");
    
    rendereq("#faeq");
    for(var i; i<matrix.length;i++){
                
        
            $("#result").append("<div class=\"row d mt-1 r"+i+"\"style=\"display:none; \"><div class=\"col bg-danger text-white text-center otp\" >\`"+matrix[i][0]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][1]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][2]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][3]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][4]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][5]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][6]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][7]+"\`</div></div> ");
    
            $(".r"+i).fadeIn(2000);
      
    }
    rendereq("#faeq");


    /* */

}
function newton(){
    $("#result .d").remove();
    $("input").removeClass("invalid");
    var x0= $("#newx0").val();
   // var xl=$("#faxl").val();
    var erp=$("#newerror").val();
    var eq=$("#neweq").val();
    var e = nerdamer(eq);
    var variables = e.variables();
    
    var err=[];
    if(!$.isNumeric(x0)){
        err[0]="error in x0";
        $("#newx0").addClass("invalid");
    }
    if(!(variables.length==1 && variables.find(function(e){return e=='x';})=='x')){
        err[1]="error in eq";
        $("#neweq").addClass("invalid");
    }
    if($("#newchecktoit").is(':checked')){
        if(!($.isNumeric(erp)&& Number(erp)>0)){
            err[3]="error in erp";
            $("#newerror").addClass("invalid");
        } 

    }else{
        if(!($.isNumeric(erp)&& Number(erp)>=0 && Number(erp)<=100)){
            err[2]="error in erp";
            $("#newerror").addClass("invalid");
        } 
    }  
    
      
    for(var i=0;i<err.length;i++){
        console.log(err[i]);
        if((err.length-i)==1){
            MathJax.typesetClear();
            return 0; }
    }
    rendereq("#neweq");
    erp=Number(erp);
    x0=Number(x0);
    var erc;
    var itration =0;
    var xrn = x0,xro,fxr,fdxr;
    var matrix=[];
    var b=true;
    fxr=nerdamer(eq,{x:x0});
    fxr=Number(fxr);
    var eqd = math.derivative(eq, 'x').toString();
    fdxr=nerdamer(eqd,{x:x0});
    fdxr=Number(fdxr);
    do{
        console.log(itration);
        
        if(itration==0){
            xro=xrn;
            xrn=xro-(fxr/fdxr);
            matrix[itration]=[xro.toFixed(3),fxr.toFixed(3),fdxr.toFixed(3),"---"];
            itration++;
            
        }else{
            
            
           
            
            erc = Math.abs((xrn-xro)/xrn)*100;
            fxr=nerdamer(eq,{x:xrn});
            fxr=Number(fxr);
            fdxr=nerdamer(eqd,{x:xrn});
            fdxr=Number(fdxr);
            xro=xrn;
            xrn=xro-(fxr/fdxr);
            matrix[itration]=[xro.toFixed(3),fxr.toFixed(3),fdxr.toFixed(3),erc.toFixed(3)];
            itration++;
            console.log(itration);
            if($("#newchecktoit").is(':checked'))
                b=(!(erp==itration))?true:false;
            else
                b=(!(erc<=erp))?true:false;
            

        }

    }while(b)  
    /* */
    

    $("#result").append("<div class=\"row d\"><div class=\"col bg-danger text-white text-center\">\`I\`</div><div class=\"col bg-primary text-white text-center\">\`X_\{i\}\`</div><div class=\"col bg-success text-white text-center\">\`F\(X_\{i\}\)\`</div><div class=\"col bg-primary text-white text-center\">\`F\(X_\{i\}\)\`</div><div class=\"col bg-success text-white text-center error\">\`\\varepsilon_e\`</div></div>  ");
    
    rendereq("#neweq");
    for(var i; i<matrix.length;i++){
                
        
            $("#result").append("<div class=\"row mt-1 d r"+i+"\"style=\"display:none; \"><div class=\"col bg-danger text-white text-center\">\`"+i+"\`</div><div class=\"col bg-primary text-white text-center otp\" >\`"+matrix[i][0]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][1]+"\`</div><div class=\"col bg-primary text-white text-center otp\">\`"+matrix[i][2]+"\`</div><div class=\"col bg-success text-white text-center otp\">\`"+matrix[i][3]+"\`</div></div> ");
    
            $(".r"+i).fadeIn(2000);
      
    }
    rendereq("#neweq");

}
function guass(){
    $("#result .d").remove();
    $("input").removeClass("invalid");
    var e=[];
    var en=1;
    var valide = true;
    for(var i=0;i<3;i++){
        e[i]=[];
        for(var j=0;j<4;j++){
            e[i][j]=$("#e"+en).val();
            if(!$.isNumeric(e[i][j])){
                $("#e"+en).addClass("invalid");
                valide= false;
            }
            en++;
            console.log(en);    
        }
    }
    if(!valide){
        return 0;
    }
    $("#output").html(" <table class=\"matrix augmented-matrix\"><tbody><tr><td>\`"+e[0][0]+"\`</td><td>\`"+e[0][1]+"\`</td><td>\`"+e[0][2]+"\`</td><td>\`"+e[0][3]+"\`</td></tr><tr><td>\`"+e[1][0]+"\`</td><td>\`"+e[1][1]+"\`</td><td>\`"+e[1][2]+"\`</td><td>\`"+e[1][3]+"\`</td></tr><tr><td>\`"+e[2][0]+"\`</td><td>\`"+e[2][1]+"\`</td><td>\`"+e[2][2]+"\`</td><td>\`"+e[2][3]+"\`</td></tr></tbody></table>");
    
        MathJax.typesetClear();
        MathJax.typeset();
     var m10 = e[1][0] / e[0][0];
     var m20 = e[2][0] / e[0][0];
     for (var i = 0; i < 4; i++) {
		e[1][i] = e[1][i] - m10 * e[0][i];
		e[2][i] = e[2][i] - m20 * e[0][i];
    }
    var m21 = e[2][1] / e[1][1];
	for (var i = 0; i < 4; i++) {
		e[2][i] = e[2][i] - m21 * e[1][i];
    }
    var x3 = e[2][3] / e[2][2];
	var x2 = (e[1][3] - (e[1][2] * x3)) / e[1][1];
    var x1 = (e[0][3] - ((e[0][1] * x2) + (e[0][2] * x3))) / e[0][0];
    console.log(x1+"\n"+x2+"\n"+x3);
    $("#result").append("<div class=\" d mat row\"><div class=\"col\">\`x1 = "+x1+"\`</div><div class=\"col\">\`x2 = "+x2+"\`</div><div class=\"col\">\`x3 = "+x3+"\`</div> </div>");
    MathJax.typesetClear();
    MathJax.typeset();
  
}
function lu(){
    $("#result .d").remove();
    $("input").removeClass("invalid");
    var u=[],l=[], b=[];
    var e=[];
    var en=1;
    var valide = true;
    for(var i=0;i<3;i++){
        e[i]=[];
        for(var j=0;j<4;j++){
            e[i][j]=$("#le"+en).val();
            if(!$.isNumeric(e[i][j])){
                $("#le"+en).addClass("invalid");
                valide= false;
            }
            en++;
            console.log(en);    
        }
    }
    if(!valide){
        return 0;
    }
    $("#output").html(" <table class=\"matrix augmented-matrix\"><tbody><tr><td>\`"+e[0][0]+"\`</td><td>\`"+e[0][1]+"\`</td><td>\`"+e[0][2]+"\`</td><td>\`"+e[0][3]+"\`</td></tr><tr><td>\`"+e[1][0]+"\`</td><td>\`"+e[1][1]+"\`</td><td>\`"+e[1][2]+"\`</td><td>\`"+e[1][3]+"\`</td></tr><tr><td>\`"+e[2][0]+"\`</td><td>\`"+e[2][1]+"\`</td><td>\`"+e[2][2]+"\`</td><td>\`"+e[2][3]+"\`</td></tr></tbody></table>");
    for(var i=0;i<3;i++){
        u[i]=[];
        for(var j=0;j<3;j++){
            u[i][j]=e[i][j];
           
              
        }
        b[i]=e[i][3];
    }
        MathJax.typesetClear();
        MathJax.typeset();
     var m10 = u[1][0] / u[0][0];
     var m20 = u[2][0] / u[0][0];
     for (var i = 0; i < 3; i++) {
		u[1][i] = u[1][i] - m10 * u[0][i];
		u[2][i] = u[2][i] - m20 * u[0][i];
    }
    var m21 = u[2][1] / u[1][1];
	for (var i = 0; i < 3; i++) {
		u[2][i] = u[2][i] - m21 * u[1][i];
    }
    l[0]=[];
    l[1]=[];
    l[2]=[];

    l[0][0] = 1;
	l[1][1] = 1;
    l[2][2] = 1;
    
    l[0][1] = 0;
	l[0][2] = 0;
	l[1][2] = 0;

	l[1][0] = m10;
	l[2][0] = m20;
    l[2][1] = m21;
    
    var c1 = b[0] / l[0][0];
	var c2 = (b[1] - (l[1][0] * c1)) / l[1][1];
    var c3 = (b[2] - ((l[2][0] * c1) + (l[2][1] * c2))) / l[2][2];
    console.log(c1+"\n"+c2+"\n"+c3);
    for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			e[i][j] = u[i][j];
		}
	}
	e[0][3]=c1;
	e[1][3]=c2;
	e[2][3]=c3;

    var x3 = e[2][3] / e[2][2];
	var x2 = (e[1][3] - (e[1][2] * x3)) / e[1][1];
    var x1 = (e[0][3] - ((e[0][1] * x2) + (e[0][2] * x3))) / e[0][0];
    console.log(x1+"\n"+x2+"\n"+x3);
    $("#result").append("<div class=\" d mat row\"><div class=\"col\">\`x1 = "+x1+"\`</div><div class=\"col\">\`x2 = "+x2+"\`</div><div class=\"col\">\`x3 = "+x3+"\`</div> </div>");
    MathJax.typesetClear();
    MathJax.typeset();
  
}
$("#selection").change(function(){
    var i=$("#selection").val();
    $(".algo").css("visibility", "hidden");
        $(".algo input").val('');
        $("#result .d").remove();
        $("#output").html('');
        $("input").removeClass("invalid");
        $(".checktoit"). prop("checked", false);
    if(i==1){
        $(".bisection").css("visibility", "visible");
        
    }
    if(i==2){
        
        $(".simplefixed").css("visibility", "visible");
        
    }
    if(i==3){
       
        $(".falseposition").css("visibility", "visible");
       
    }
     if(i==4){
        
        $(".newton").css("visibility", "visible");
       
    }
    if(i==5){
        
        $(".guass").css("visibility", "visible");
       
    }
    if(i==6){
         
        $(".lu").css("visibility", "visible");
       
    }
  });
  $("#bisubmit").click(function(){
      
        console.log("from submit");
  
        bisection();
  });
  $("#sisubmit").click(function(){
    console.log("from submit");
    simplefixed();
  });
  $("#fasubmit").click(function(){
    console.log("from submit");
    falseposition();
  });
  $("#newubmit").click(function(){
    console.log("from submit");
    newton();
  });
  $("#guassubmit").click(function(){
    console.log("from submit");
    guass();
  });
  $("#lusubmit").click(function(){
    console.log("from submit");
    lu();
  });


/*algorithm */
$(document).ready(function() {
    $("#content").hide();
})
$(window).on("load",function(){
    setTimeout(function() {
        $("#matrix").remove();
        $("#content").fadeIn(3000);
        $(".algo").css("visibility", "hidden");
        $(".bisection").css("visibility", "visible");

   }, 5000);
   
   
});
/* resize the window  */

/* resize the window */