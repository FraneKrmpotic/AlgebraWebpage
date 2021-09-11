var i = 0;
var j = 0;
var node = document.createElement("BR");
var txt = 'Budi izvrstan u onom što voliš.';
var txt2 = 'ZAISKRI.';
var speed = 200;
var speed2 = 300;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  if (i == txt.length && j < txt2.length) {
    if (i == txt.length && j == 0) {
      document.getElementById("demo").appendChild(node);
    }
    document.getElementById("demo2").innerHTML += txt2.charAt(j);
    j++;
    setTimeout(typeWriter, speed2);
  }
}
