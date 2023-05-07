const ReadLine = require('readline');

const readline = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout
});


const isPalindrome = (x) => {

    // Membalikkan string
    let reversed = x.split('').reverse().join('');
    

    const result = x===reversed;
    let message;

    if(result){
        message = `${x} reads as ${reversed} from left to right and from right to left.`
    }else{
        message = `From left to right, it reads ${x}. From right to left, it becomes ${reversed}. Therefore it is not a palindrome.`;
    }

    if(x.length <= 2 && !result ){
        message = `Reads ${reversed} from righ to left. Therefor it is not a palindrome.`
    }

    return {
        output : result,
        message : message
    }
}

readline.question('Input: ', (value) => {
//   console.log(`The user entered: ${value}`);
    const result = isPalindrome(value)
    console.log('Output:', result.output) ;
    console.log('Explanation:', result.message) ;
  readline.close();
});
