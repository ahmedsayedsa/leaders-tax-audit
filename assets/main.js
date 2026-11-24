// ====== إعدادات الموقع — تُعدَّل من هنا عند وصول بيانات العميل ======
var SITE_CONFIG = {
  whatsapp: "201500201189", // رقم الواتساب بصيغة دولية دون +
  email: ""     // البريد الرسمي لاستقبال الطلبات
};
// ================================================================
(function () {
  var burger = document.getElementById('burger');
  var links = document.getElementById('links');
  if (burger && links) {
    burger.addEventListener('click', function () { links.classList.toggle('open'); });
  }
  document.querySelectorAll('.faq button.q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach(function (f) {
        f.classList.remove('open');
        f.querySelector('.pm').textContent = '+';
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.querySelector('.pm').textContent = '−';
      }
    });
  });
  // أزرار الواتساب العائمة: تعمل فور إضافة الرقم في الإعدادات
  if (SITE_CONFIG.whatsapp) {
    document.querySelectorAll('.wa-float').forEach(function (a) {
      a.href = 'https://wa.me/' + SITE_CONFIG.whatsapp;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }
  // نموذج التواصل: يحوّل الطلب إلى رسالة واتساب جاهزة، أو بريد إن لم يوجد رقم
  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var phone = document.getElementById('f-phone').value.trim();
      var svc = document.getElementById('f-service').value;
      var msg = document.getElementById('f-msg').value.trim();
      var text = 'طلب جديد من موقع ليدرز للضرائب والمراجعة%0A' +
        'الاسم: ' + encodeURIComponent(name) + '%0A' +
        'رقم الهاتف: ' + encodeURIComponent(phone) + '%0A' +
        'الخدمة المطلوبة: ' + encodeURIComponent(svc) +
        (msg ? '%0Aالتفاصيل: ' + encodeURIComponent(msg) : '');
      if (SITE_CONFIG.whatsapp) {
        window.open('https://wa.me/' + SITE_CONFIG.whatsapp + '?text=' + text, '_blank');
      } else if (SITE_CONFIG.email) {
        window.location.href = 'mailto:' + SITE_CONFIG.email + '?subject=' + encodeURIComponent('طلب خدمة — ' + svc) + '&body=' + text;
      }
      var done = document.getElementById('form-done');
      if (done) { done.style.display = 'block'; }
      form.reset();
    });
  }
})();
