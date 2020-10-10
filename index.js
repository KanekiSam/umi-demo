var urls = [
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png',
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log('一张图片加载完成');
      resolve(img);
    };
    img.onerror = function() {
      reject(new Error('Could not load image at' + url));
    };
    img.src = url;
  });
}
var links = [1, 2, 3, 4, 5, 6, 7, 8];
function getLink(url) {
  return new Promise(function(resolve, reject) {
    if (!links.length) {
      reject('all link is load');
    } else {
      setTimeout(function() {
        if (Math.random() * 6 > 2) {
          const index = links.findIndex(item => item == url);
          links.splice(index, 1);
          resolve(url);
        } else {
          reject('timeout');
        }
      }, Math.random() * 2000);
    }
  });
}
// 循环主线
function roopRes(url) {
  loadImg(url)
    .then(function(link) {
      // 成功打印
      console.log('success:' + link);
    })
    .catch(function(err) {
      // 失败打印
      console.log('fail:' + err);
    })
    .finally(function() {
      if (links.length) {
        links.slice(0, num);
      }
    });
}
function flowLimit(num) {
  links.slice(0, num).forEach(function(item) {
    getLink(item)
      .then(function(link) {
        // 成功打印
        console.log('success:' + link);
      })
      .catch(function(err) {
        // 失败打印
        console.log('fail:' + err);
      })
      .finally(function() {
        if (links.length) {
          flowLimit(num);
        }
      });
  });
}
flowLimit(3);

// var urls = [
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png',
//   'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png',
// ];
// function loadImg(url) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(url);
//     }, 1000);
//   });
// }
// function limitLoad(urls, handler, limit) {
//   let sequence = [].concat(urls); // 复制urls
//   // 这一步是为了初始化 promises 这个"容器"
//   let promises = sequence.splice(0, limit).map((url, index) => {
//     return handler(url).then(() => {
//       // 返回下标是为了知道数组中是哪一项最先完成
//       return index;
//     });
//   });
//   // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
//   return sequence
//     .reduce((pCollect, url) => {
//       return pCollect
//         .then(() => {
//           return Promise.race(promises); // 返回已经完成的下标
//         })
//         .then(fastestIndex => {
//           // 获取到已经完成的下标
//           // 将"容器"内已经完成的那一项替换
//           promises[fastestIndex] = handler(url).then(() => {
//             return fastestIndex; // 要继续将这个下标返回，以便下一次变量
//           });
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     }, Promise.resolve()) // 初始化传入
//     .then(() => {
//       // 最后三个用.all来调用
//       return Promise.all(promises);
//     });
// }
// limitLoad(urls, loadImg, 3)
//   .then(res => {
//     console.log('图片全部加载完毕');
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });
// Promise.race([
//   Promise.reject('666'),
//   new Promise(r => {
//     setTimeout(() => {
//       r('123');
//     }, 0);
//   }),
// ]).then(res=>{
//   console.log(res)
// }).catch(err=>{
//   console.log(err)
// });
