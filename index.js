var links = [1, 2, 3, 4, 5, 6, 7, 8];
function getLink(index) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (links.length) {
        var link = links[index != undefined ? index : 0];
        links.shift();
        resolve(link);
      } else {
        reject('no-links');
      }
    }, Math.random() * 2000);
    // setTimeout(function() {
    //   reject('timeout');
    // }, Math.random() * 3000);
  });
}
function roopRes(index) {
  getLink(index)
    .then(function(link) {
      console.log('success:' + link);
    })
    .catch(function(err) {
      console.log('fail:' + err);
    })
    .finally(function() {
      if (links.length) {
        roopRes();
      }
    });
}
function flowLimit(num) {
  links.slice(0, num).forEach(function(item, i) {
    roopRes(i);
  });
}
flowLimit(3);
