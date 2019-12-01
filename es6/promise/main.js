const fs = require('fs');

// fs.readFile('./a.txt',function(err,res){
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log(res.toString());
// })

function readFile(){
    //读取完a文件之后，依此b,c文件
    //fs.readFile('./a.txt',function(err,res){  //回调函数，嵌套使用
    //第一种
    //     if(err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(res.toString());
    //     fs.readFile('./b.txt',function(err,res){
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log(res.toString());
    //         fs.readFile('./c.txt',function(err,res){
    //             if(err) {
    //                 console.log(err);
    //                 return;
    //             }
    //             console.log(res.toString());
                
    //         })   
    //     })    
    // })
        const aFile = readFileSync('a.txt');
        console.log(aFile);
        const bFile = readFileSync('b.txt');
        console.log(bFile);
        const cFile = readFileSync('c.txt');
        console.log(cFile);
        
}

readFile();