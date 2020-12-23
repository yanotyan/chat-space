$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html = 
        `<div class="message">
          <div class="MessageTop">
            <div class="MessageTop__username">
              ${message.user_name}
            </div>
            <div class="MessageTop__date">
              ${message.created_at}
            </div>
          </div>
          <div class="MessageMain">
            <p class="Message__content">
            ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
        `<div class="message">
           <div class="MessageTop">
             <div class="MessageTop__username">
              ${message.user_name}
             </div>
             <div class="MessageTop__date">
              ${message.created_at}
             </div>
            </div>
          <div class="MessageMain">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
  
     $.ajax({
       url: url,
       type: "POST",
       data: formData,
       dataType: 'json',
       processData: false,
       contentType: false
     })
     .done(function(data){
      let html = buildHTML(data);
      $(".chat-main__message-list").append(html)
      $('#message_content').val('')
      })
      .fail(function(){
          alert("エラ〜だよ")
      })
  })
});