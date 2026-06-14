document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.mobile-menu-toggle');
  var closeBtn = document.querySelector('.sidebar-close');
  var siteFrame = document.querySelector('.site-frame');
  var sidebar = document.getElementById('sidebar');

  if (!siteFrame || !sidebar) {
    return;
  }

  var closeSidebar = function () {
    siteFrame.classList.remove('sidebar-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  var openSidebar = function () {
    siteFrame.classList.add('sidebar-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }
  };

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (siteFrame.classList.contains('sidebar-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeSidebar();
    });
  }

  sidebar.addEventListener('click', function (event) {
    var target = event.target.closest('a');
    if (!target) {
      return;
    }
    if (siteFrame.classList.contains('sidebar-open')) {
      closeSidebar();
    }
  });

  document.addEventListener('click', function (event) {
    if (!siteFrame.classList.contains('sidebar-open')) {
      return;
    }
    if (sidebar.contains(event.target) || (toggle && toggle.contains(event.target))) {
      return;
    }
    closeSidebar();
  });

  var overlay = document.querySelector('.sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
});
