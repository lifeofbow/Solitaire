
//global variables
var tally=new Array(14);
var nextcard=1;
var nexti=new Image(53,68);
//numberic comparison for sort;
function numsort(a,b){
	return a-b;
}

function InitGame(){
	if(!document.getElementById)return;
	stat=document.getElementById("status");
	stat.innerHTML="Next Card";
	nextcard=1;
	//array for board contents
	board=new Array(26);
	for(i=1;i<26;i++){
		board[i]=new Card(0,"x");
		obj=document.getElementById("card"+i);
		obj.src="poker/blank.jpg";
		obj.onclick=PlaceCard;
	}
	//fill the deck(in order for now)
	deck=new Array(53);
	for(i=1;i<14;i++){
		deck[i]=new Card(i,"c");
		deck[i+13]=new Card(i,"h");
		deck[i+26]=new Card(i,"s");
		deck[i+39]=new Card(i,"d");
	}
	//clear the scores
	Score();
	//shuffle the deck(200~300)
	n=Math.floor(100*Math.random()+200);
	for(i=1;i<n;i++){
		c1=Math.floor(52*Math.random()+1);//1~53
		c2=Math.floor(52*Math.random()+1);//1~53
		temp=deck[c2];
		deck[c2]=deck[c1];
		deck[c1]=temp;
	}
	//draw the first card on the screen 
	next=document.getElementById("dcard");
	next.src=deck[nextcard].fname();
	//preload the next image
	nexti.src=deck[nextcard].fname();
	obj.getElementById("newname");
	obj.onclick=InitGame;
}
function PlaceCard(e){
	if(!e){
		var e=window.event;
	}
	thiscard=(e.target)?e.target:e.srcElemnet;
	pos=thiscard.id.substring(4);
	if(board[pos].suit!="x"){
		return;
	}
	drawcard=document.getElementById("dcard");
	thiscard.src=deck[nextcard].fname();
	drawcard.src="poker/blank.jpg";
	board[pos]=deck[nextcard];
	nextcard++;
	Score();
 		//game over?
 	if(nextcard>25){
 		EndGame();
 	}
 	else{
 		drawcard.src=deck[nextcard].fname();
		//cache next image for draw pile
		nexti=new Image(53,68);
		nexti.src=deck[nextcard+1].fname();
	}
}

//check for complete rows and display row scores

function Score(){

}

//gameover -final scores
function EndGame(){
	start=document.getElementById("status");
	start.innerHTML="<b>Game Over</b>";
}

//get file name src
function fname(){
	return "poker/"+this.num+this.suit+".jpg";
}

//constructor for card object
function Card(num,suit){
	this.num=num;
	this.suit=suit;
	this.fname=fname;
}

window.onload=InitGame;