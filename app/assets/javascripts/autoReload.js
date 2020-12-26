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
    let last_message_id = $('.message:last').data("message-id") || 0;
    console.log(last_message_id)
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
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});