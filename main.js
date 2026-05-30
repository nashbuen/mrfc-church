// MRFC Church - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Auto-dismiss alerts
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(function (alert) {
    setTimeout(function () {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 5000);
  });

  // Animate counters
  const counters = document.querySelectorAll('.stat-number[data-target]');
  counters.forEach(function (counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current + suffix;
    }, 30);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Sermon category filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const category = this.dataset.category;
      window.location.href = '/sermons/' + (category ? '?category=' + category : '');
    });
  });

  // Give amount buttons
  const giveAmountBtns = document.querySelectorAll('.give-amount-btn');
  giveAmountBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      giveAmountBtns.forEach(function (b) { b.classList.remove('selected'); });
      this.classList.add('selected');
      const amountInput = document.getElementById('giveAmount');
      if (amountInput && this.dataset.amount) {
        amountInput.value = this.dataset.amount;
      }
    });
  });

  // Gallery lightbox (simple)
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const imgSrc = this.querySelector('img').src;
      const modal = document.getElementById('galleryModal');
      if (modal) {
        modal.querySelector('.modal-body img').src = imgSrc;
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
      }
    });
  });

  // Active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
