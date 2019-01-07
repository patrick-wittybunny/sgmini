function QuizGenerator(token) {

  // this.token = null;
  this.token = token;

  this.getToken = function() {
    let self = this;
    let newToken = false;

    function checkToken() {
      return new Promise(function(resolve, reject) {
        httpGet(`https://opentdb.com/api.php?amount=1&token=${self.token}`, 'json',
          'false',
          function(res) {
            if (res.response == 3 || res.response == 4) reject();
            else resolve();
          });
      });
    }

    return new Promise((resolve) => {
      if (token) {
        checkToken().catch(function() {
          newToken = true;
        });
      } else newToken = true;

      if (newToken) {
        console.log('here1');

        httpGet('https://opentdb.com/api_token.php?command=request', 'json', false, function(res) {
          self.token = res.token;
          return resolve();
        });
      } else {
        console.log('here2');

        return resolve();

      }
    });


    //     return new Promise(function(resolve, reject) {
    //       if (!reset) {

    //         if (self.token) return resolve();
    //         else {
    //           httpGet('https://opentdb.com/api_token.php?command=request', 'json', false, function(res) {
    //             self.token = res.token;
    //             return resolve();
    //           });
    //         }
    //       } else {
    //         httpGet(`https://opentdb.com/api_token.php?command=reset&token=${token}`, 'json', false, function(res) {
    //            httpGet('https://opentdb.com/api_token.php?command=request', 'json', false, function(res) {
    //             self.token = res.token;
    //             return resolve();
    //           });
    //         });
    //       }


    //     });
  }

  this.generateConfig = function() {
    let rand = Math.floor(Math.random() * categories.length);
    // let rand2 = Math.floor(Math.random() * amounts.length);
    let category_id = categories[rand].id;
    // let amount = amounts[rand2];
    let search_string = `amount=${amount}&category=${category_id}&difficulty=easy`;
    return search_string;
  }

  this.getQuiz = function() {
    let self = this;

    return new Promise(function(resolve, reject) {

      self.getToken().then(function() {

        // console.log(url);
        // console.log(self.token);
        // let url = `${base_url}?${self.generateConfig()}&token=${self.token}&encode=base64`;
        let url = `${base_url}?${self.generateConfig()}&encode=base64`;

        // console.log(url);
        httpGet(url, 'json', false, function(res) {
          //           console.log(res);
          console.log(res);
          if (!res.response) {
            resolve(res.results);
          } else reject();
          // else if(res.response ==
        });
      });
    });
  }
}



const categories = [{
    "id": 9,
    "name": "General Knowledge"
  },
  {
    "id": 10,
    "name": "Entertainment: Books"
  },
  {
    "id": 11,
    "name": "Entertainment: Film"
  },
  {
    "id": 12,
    "name": "Entertainment: Music"
  },
  {
    "id": 17,
    "name": "Science & Nature"
  },
  {
    "id": 18,
    "name": "Science: Computers"
  },
  {
    "id": 19,
    "name": "Science: Mathematics"
  },
  {
    "id": 26,
    "name": "Celebrities"
  },
  {
    "id": 27,
    "name": "Animals"
  },
  {
    "id": 23,
    "name": "History"
  },
  {
    "id": 22,
    "name": "Geography"
  },
  {
    "id": 20,
    "name": "Mythology"
  }
]

// const amounts = [5, 10, 7];
// const amount = 7;
const amount = 20;
const base_url = 'https://opentdb.com/api.php';