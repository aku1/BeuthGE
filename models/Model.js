


function Model(filename){

  this.vertices;
  this.colors;
  this.vertexPositionBuffer;
  this.vertexNormalBuffer;
  this.vertexTextureCoordBuffer;
  this.vertexIndexBuffer;
  this.texture;
  this.colorBuffer;
  
  
    
  
   $.ajaxSetup({'beforeSend': function(xhr){
		if (xhr.overrideMimeType)
			xhr.overrideMimeType("text/json");
		}
	}); 		
  
   Model.prototype.setTexture=function(texture){
   		this.texture=texture;
   }
   
   
    Model.prototype.draw = function(gl,pMatrix, mvMatrix){
	    
			//is json loaded
			if(this.data==null)return;
			var data=this.data; 	  
			
			if(data.cube.t != null){
				this.vertexTextureCoordBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.cube.t), gl.STATIC_DRAW);
				this.vertexTextureCoordBuffer.itemSize = 2;
				this.vertexTextureCoordBuffer.numItems = data.cube.t.length / 2;
			}
			if(data.cube.c != null){
				this.colorBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.cube.c), gl.STATIC_DRAW);
				this.colorBuffer.itemSize = 4;
				this.colorBuffer.numItems = data.cube.c.length / 2;
			}
			
			this.vertexPositionBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.cube.v), gl.STATIC_DRAW);
			this.vertexPositionBuffer.itemSize = 3;
			this.vertexPositionBuffer.numItems = data.cube.v.length / 3;
		
			this.vertexIndexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.cube.i), gl.STATIC_DRAW);
			this.vertexIndexBuffer.itemSize = 1;
			this.vertexIndexBuffer.numItems = data.cube.i.length;
		
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
			
			if(this.vertexTextureCoordBuffer != null){
				//todo texture
			}else if(this.colorBuffer != null){
				gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
				gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
			}
		  
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
			gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
            gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
			//mat4.identity(mvMatrix);
			gl.drawElements(gl.TRIANGLES,this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);			
		}
   
   
	Model.prototype.load=function(filename,model){
	     var that=model;
		$.getJSON(filename, function(data) {
		$('.result').html(data);
		that.data=data;
	
	 });
	}
	
	
	
	this.load(filename,this);
	
} 
