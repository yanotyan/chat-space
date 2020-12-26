$(function(){

  
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html = 
        `<div class="message" data-message-id=${message.id}>
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
        `<div class="message" data-message-id=${message.id}>
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

  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.MessageField').append(insertHTML);
       }
      })
    .fail(function() {
      alert('error');
    });
    setInterval(reloadMessages, 7000);
  };

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
      $('.chat-main__message-list').append(html)
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.form')[0].reset()
      $('.form-send').prop("disabled", false);
      })
      .fail(function(){
          alert("エラ〜だよ")
          $('.form-send').prop("disabled", false);
      })
  })
});