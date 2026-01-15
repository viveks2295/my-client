

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", (e) => {
  mobileMenu.classList.toggle("hidden");
  e.stopPropagation(); // Prevent the click from closing menu immediately
});

// Close mobile menu if clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.add("hidden");
  }
});

// Optional: close menu when clicking a link inside
const menuLinks = mobileMenu.querySelectorAll("a");
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Gallery Image Modal
function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = src;           // Set clicked image
  modal.classList.remove("hidden");
  modal.style.display = "flex";   // Show modal as flex
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  modal.style.display = "none";   // Hide modal
}

// Close modal when clicking outside the image
document.getElementById("imageModal").addEventListener("click", (e) => {
  if(e.target.id === "imageModal") {
    closeModal();
  }
});

// Video Modal
function openVideoModal(src) {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    modalVideo.src = src;
    modal.classList.remove("hidden");
    modal.style.display = "flex";
    modalVideo.play(); // auto-play when opened
  }
  
  function closeVideoModal() {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    modalVideo.pause();   // pause when closed
    modalVideo.src = "";  // reset source
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
  
  // Close video modal by clicking outside video
  document.getElementById("videoModal").addEventListener("click", (e) => {
    if (e.target.id === "videoModal") closeVideoModal();
  });
  

// Horizontal Scroll Drag for Gallery (Optional)
const scrollContainers = document.querySelectorAll(".scroll-container");
scrollContainers.forEach(container => {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("cursor-grabbing");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("cursor-grabbing");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("cursor-grabbing");
  });

  container.addEventListener("mousemove", (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    container.scrollLeft = scrollLeft - walk;
  });
});

// Booking Form Submission
  const form = document.getElementById("bookingForm");
  const resultBox = document.getElementById("bookingResult");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const mobileVal = document.getElementById("mobile").value.trim();

// Mobile validation
const mobileRegex = /^[6-9]\d{9}$/;

if (!mobileRegex.test(mobileVal)) {
  alert("❌ Please enter a valid 10-digit mobile number");
  return;
}


    document.getElementById("rName").textContent =
      document.getElementById("name").value;

    document.getElementById("rMobile").textContent =
      document.getElementById("mobile").value;

    document.getElementById("rDate").textContent =
      document.getElementById("date").value;

    document.getElementById("rProduct").textContent =
      document.getElementById("product").value;

    resultBox.classList.remove("hidden");
    form.reset();
  });

<script>
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("bookingForm");

  if (!form) {
    console.error("❌ bookingForm not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameVal = document.getElementById("name").value;
    const mobileVal = document.getElementById("mobile").value;
    const dateVal = document.getElementById("date").value;
    const productVal = document.getElementById("product").value;

    fetch("/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameVal,
        mobile: mobileVal,
        date: dateVal,
        product: productVal
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Booking successful");
        form.reset();
      } else {
        alert("❌ Booking failed");
      }
    })
    .catch(err => {
      console.error(err);
      alert("❌ Server error");
    });
  });

});
</script>
