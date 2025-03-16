// 检测移动端的简单函数
function isMobileDevice() {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', function() {
  // 先判断是否移动端，给 body 添加相应的类
  if (isMobileDevice()) {
    document.body.classList.add('mobile');
  } else {
    document.body.classList.add('desktop');
  }

  // ============== 以下是原有代码 ==============
  
  // 定义中英文翻译
  const translations = {
    zh: {
      nav: { home: "首页", personal: "个人", resume: "简历", contact: "联系方式" },
      home: { greeting: ":D 你好" },
      personal: { title: "个人信息", content: "这里可以放置你的个人简介、爱好或者其他相关介绍文字。你可以根据需要进行修改和扩展。" },
      resume: { title: "简历", content: "在这里展示你的工作经历、教育背景和其他成就。" },
      contact: { title: "联系方式", content: "这里将展示你的联系方式，如邮箱、电话等信息。" }
    },
    en: {
      nav: { home: "Home", personal: "Personal", resume: "Resume", contact: "Contact" },
      home: { greeting: ":D Hello" },
      personal: { title: "Personal Info", content: "Here you can place your personal biography, hobbies, or other related introduction. You can modify and extend it as needed." },
      resume: { title: "Resume", content: "Display your work experience, education background, and other achievements here." },
      contact: { title: "Contact", content: "Your contact information, such as email and phone, will be displayed here." }
    }
  };

  let currentLanguage = 'zh'; // 默认中文

  // 根据当前语言更新页面所有文本
  function updateLanguage() {
    document.getElementById('nav-home').textContent = translations[currentLanguage].nav.home;
    document.getElementById('nav-personal').textContent = translations[currentLanguage].nav.personal;
    document.getElementById('nav-resume').textContent = translations[currentLanguage].nav.resume;
    document.getElementById('nav-contact').textContent = translations[currentLanguage].nav.contact;

    document.getElementById('home-greeting').textContent = translations[currentLanguage].home.greeting;
    document.getElementById('personal-title').textContent = translations[currentLanguage].personal.title;
    document.getElementById('personal-content').textContent = translations[currentLanguage].personal.content;
    document.getElementById('resume-title').textContent = translations[currentLanguage].resume.title;
    document.getElementById('resume-content').textContent = translations[currentLanguage].resume.content;
    document.getElementById('contact-title').textContent = translations[currentLanguage].contact.title;
    document.getElementById('contact-content').textContent = translations[currentLanguage].contact.content;

    document.title = translations[currentLanguage].nav.home;
  }

  // 昼夜模式切换
  const toggleSwitch = document.getElementById('toggle');
  toggleSwitch.addEventListener('change', function() {
    const nav = document.querySelector('nav');
    if (this.checked) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
      nav.style.background = 'var(--indigo-background)';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      nav.style.background = 'var(--blue-background)';
    }
  });

  // 点击国旗切换语言
  const langChinese = document.getElementById('lang-chinese');
  const langEnglish = document.getElementById('lang-english');

  langChinese.addEventListener('click', function() {
    currentLanguage = 'zh';
    updateLanguage();
  });
  langEnglish.addEventListener('click', function() {
    currentLanguage = 'en';
    updateLanguage();
  });

  // 导航链接点击时触发平滑滚动
  const navLinks = document.querySelectorAll('nav ul li a');
  let disableAutoScroll = false; 
  const sections = document.querySelectorAll('section');
  let currentSectionIndex = 0;
  let isAutoScrolling = false;

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      disableAutoScroll = true;
      const targetId = this.getAttribute('href').substring(1);
      const index = Array.from(sections).findIndex(section => section.id === targetId);
      if (index !== -1) {
        currentSectionIndex = index;
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => { disableAutoScroll = false; }, 2000);
    });
  });

  // 鼠标滚轮事件监听
  window.addEventListener('wheel', function(e) {
    if (isAutoScrolling || disableAutoScroll) return;
    sections.forEach((section, index) => {
      if (window.pageYOffset >= section.offsetTop - section.offsetHeight / 2 &&
          window.pageYOffset < section.offsetTop + section.offsetHeight / 2) {
        currentSectionIndex = index;
      }
    });
    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      isAutoScrolling = true;
      currentSectionIndex++;
      sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isAutoScrolling = false; }, 1000);
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
      isAutoScrolling = true;
      currentSectionIndex--;
      sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isAutoScrolling = false; }, 1000);
    }
  });

  // 触摸滑动事件监听
  let touchStartY = null;
  window.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].clientY;
  });
  window.addEventListener('touchend', function(e) {
    if (isAutoScrolling || disableAutoScroll) return;
    let touchEndY = e.changedTouches[0].clientY;
    let diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 50) {
      sections.forEach((section, index) => {
        if (window.pageYOffset >= section.offsetTop - section.offsetHeight / 2 &&
            window.pageYOffset < section.offsetTop + section.offsetHeight / 2) {
          currentSectionIndex = index;
        }
      });
      if (diff > 0 && currentSectionIndex < sections.length - 1) {
        isAutoScrolling = true;
        currentSectionIndex++;
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isAutoScrolling = false; }, 1000);
      } else if (diff < 0 && currentSectionIndex > 0) {
        isAutoScrolling = true;
        currentSectionIndex--;
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isAutoScrolling = false; }, 1000);
      }
    }
  });

  // 初始语言设置
  updateLanguage();
});
