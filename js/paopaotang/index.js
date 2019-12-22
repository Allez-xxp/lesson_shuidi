function Player(name , teamColor){
    this.enemies=[];//敌人
    this.partners=[];//队友
    this.name=name;
    this.teamColor=teamColor;
    this.state='live';

}
Player.prototype.win=function(){
    //kill all
    console.log(`${this.name} win`);

}
//定义团队行为
Player.prototype.lose=function(){
    console.log(`${this.name} lose`);
}
//定义个人行为
Player.prototype.die=function(){
    console.log(`${this.name} die`);
    this.state = 'die';
    let all_dead = true;  
    for(var i = 0,partners;partner = this.partners[i++];){
        if(partner.state === 'live') {
            all_dead = false;
            break;
        }
    }
    if(all_dead) {
        this.lose();
        for(var i = 0,partner; partner = this.partners[i++];) {
            partner.lose();
        }
       
        for(var i = 0,enemy; enemy = this.enemies[i++];) {
            enemy.win();
        }
    }
}

//组队,生成玩家--由工厂类来负责；区别队友，敌人，由工厂去做
//工厂模式
var players = [];
var playerFactory = function(name,teamColor)
{
    var newPlayer = new Player(name,teamColor);
    for(var i =0,player; player = players[i++];) 
    {  //根据玩家颜色，区分队友和敌人
        if(player.teamColor === newPlayer.teamColor){
            player.partners.push(newPlayer);
            newPlayer.partners.push(player);
        }else{
            player.enemies.push(newPlayer);
            newPlayer.enemies.push(player);
        }
    }
    players.push(newPlayer);
    return newPlayer;

}
var player1 = playerFactory('皮皮蛋','red');
var player2 = playerFactory('乖乖','red');
var player3 = playerFactory('一枝花','red');
var player4 = playerFactory('亡灵','red');

var player5 = playerFactory('黑妞','blue');
var player6 = playerFactory('葱头','blue');
var player7 = playerFactory('海盗','blue');
var player8 = playerFactory('胖宝宝','blue');
// console.log(player1.partners,player1.enemies);

player1.die();
player2.die();
player3.die();
player4.die();


