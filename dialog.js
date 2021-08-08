const C = require("canvas");

module.exports = function(){
	this.canvas = {};
	this.ctx = {};
	this.init = function(){
		this.canvas = C.createCanvas(400, 180);
		this.ctx = this.canvas.getContext('2d');
	}
	this.dialog = function(text){
		this.init();
		this.ctx.fillStyle = "#2C2F33";
		this.ctx.fillRect(0, 0,416,680);
		
		this.ctx.textAlign = "left";
		this.ctx.font = "11pt Discord";
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.fillText(text, 10, 10);
		
		return this.canvas.toBuffer();
	}
	this.profile = function(color, avatar, nameStr, userData){
		this.init();
		this.ctx.fillStyle = color;
		this.ctx.fillRect(84, 0, 316, 180);
		this.ctx.fillStyle = "#2C2F33";
		this.ctx.fillRect(0, 0, 84, 180);
		this.ctx.fillRect(169, 26, 231, 46);
		this.ctx.fillRect(224, 108, 176, 46);
		this.ctx.shadowColor = "rgba(22, 22, 22, 1)";
		this.ctx.shadowOffsetY = 5;
		this.ctx.shadowBlur = 10;
		this.ctx.save();
		
		this.ctx.beginPath();
		this.ctx.arc(84, 90, 62, 0, Math.PI * 2, false);
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		
		this.printCircularImage(avatar, 86, 88, 64);
		
		this.ctx.textAlign = "center";
		this.ctx.font = "11pt Discord";
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.fillText(nameStr, 260, 54);
		this.ctx.fillText(`Level: ${userData.level.toLocaleString()}`, 84, 159);
		this.ctx.textAlign = "left";
		this.ctx.fillText(`Points: ${userData.points.toLocaleString()}`, 241, 136);
		return this.canvas.toBuffer();
	}
	this.printCircularImage = function(img, x, y, radius){
		const { positionX, positionY, sizeX, sizeY } = this.resolveCircularCoords(img, x, y, radius);
		
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		this.ctx.drawImage(img, positionX, positionY, sizeX, sizeY);
	}
	this.resolveCircularCoords = function(img, x, y, radius){
		const { width, height } = img;
		const [w, h] = [typeof width === 'number' ? width : width.animVal.value, typeof height === 'number' ? height : height.animVal.value];
		const ratio = w / h;
		const diameter = radius * 2;
		return {
			positionX: x - radius,
			positionY: y - radius,
			sizeX: diameter,
			sizeY: diameter
		}
	}
}


