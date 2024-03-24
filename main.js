// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");


const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: 'Thu Cuối',
      singer:'Yanbi, Mr.T, Hằng BingBoong',
      path: './assets/mp3/Thu Cuoi - Yanbi, Mr.T, Hang BingBoong - NhacHayVN.mp3',
      image: './assets/img/pan.PNG',
      hear: ''
    },
    {
      name: 'Là Anh',
      singer:'Phạm Lịch, BMZ',
      path: './assets/mp3/La Anh - Pham Lich, BMZ - NhacHayVN.mp3',
      image: './assets/img/Pan2.jpg',
      hear: ''
  },
    {
        name: 'À Lôi',
        singer:'Double2T, Masew',
        path: './assets/mp3/A Loi - Double2T, Masew - NhacHayVN.mp3',
        image: './assets/img/pan5.PNG',
        hear: ''
    },
    {
        name: 'Anh Cứ Đi Đi',
        singer:' Hari-Won',
        path: './assets/mp3/Anh-Cu-Di-Di-Hari-Won.mp3',
        image: './assets/img/pan1.PNG',
        hear: ''
    },


    {
        name: 'Giữ Lấy Làm Gì',
        singer:'Monstar',
        path: './assets/mp3/Giu-Lay-Lam-Gi-Monstar.mp3',
        image:'./assets/img/pan11.PNG',
        hear: ''
    },
    {
        name: 'Là Anh Ngộ Nhận',
        singer:'Trung Dio',
        path: './assets/mp3/La Anh Ngo Nhan - Trung Dio - NhacHayVN.mp3',
        image:'./assets/img/pan13.PNG',
        hear: ''
    },

    {
        name: 'Ngày Mai Người Ta Đi Lấy Chồng',
        singer:'Thành Đạt',
        path: './assets/mp3/Ngay Mai Nguoi Ta Lay Chong - Thanh Dat - NhacHayVN.mp3',
        image:'./assets/img/pan12.PNG',
        hear: ''
    },
    {
        name: 'Xin Đừng Lặng Im',
        singer:'Soobin Hoàng Sơn',
        path: './assets/mp3/Xin-Dung-Lang-Im-Soobin-Hoang-Son.mp3',
        image: './assets/img/Pan6.PNG',
        hear: ''
    },
    {
        name: 'Cớ Sao Giờ Lại Chia Xa',
        singer:'Bích Phương',
        path: './assets/mp3/Co-Sao-Gio-Lai-Chia-Xa-Bich-Phuong.mp3',
        image: './assets/img/pan3.jpg',
        hear: ''
    },
    {
      name: '1 2 3 4',
      singer:'Chi Dân',
      path: './assets/mp3/1234-ChiDan-5014231.mp3',
      image: './assets/img/pan16.jpg',
      hear: ''
  },
  {
    name: 'Bo Xì Bo',
    singer:'Hoàng Thùy Linh',
    path: './assets/mp3/BoXiBo-HoangThuyLinh-7702270.mp3',
    image: './assets/img/pan17.jpg',
    hear: ''
},
{
  name: 'Bụi Bay Vào Mắt',
  singer:'Đông Nhi',
  path: './assets/mp3/BuiBayVaoMat-DongNhi-8870898.mp3',
  image: './assets/img/pan18.jpg',
  hear: ''
},
{
  name: 'Dương Tính Với Thính',
  singer:'Tân Trần',
  path: './assets/mp3/DuongTinhVoiThinh-TanTran-8738646 (1).mp3',
  image: './assets/img/pan19.jpg',
  hear: ''
},
{
  name: 'Yêu 5',
  singer:'Rhymastic',
  path: './assets/mp3/Yeu5-Rhymastic-4756973.mp3',
  image: './assets/img/pan21.jpg',
  hear: ''
},
{
  name: 'See Tình',
  singer:'Hoàng Thùy Linh',
  path: './assets/mp3/SeeTinh-HoangThuyLinh-7702265.mp3',
  image: './assets/img/pan22.jpg',
  hear: ''
},
{
  name: 'Sau Lời Từ Khước',
  singer:'Phan Mạnh Quỳnh',
  path: './assets/mp3/SauLoiTuKhuocThemeSongFromMAI-PhanManhQuynh-13780092.mp3',
  image: './assets/img/pan23.jpg',
  hear: ''
},
{
  name: 'Ô Vậy Là Yêu Chưa',
  singer:'Loading........',
  path: './assets/mp3/OVayLaYeuChua-MPacificNedD-8811325.mp3',
  image: './assets/img/pan21.jpg',
  hear: ''
},
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h">
                                <li class="liked">
                                    <div class="liked1" data-index="${index}">  
                                         <i class="fas fa-heart red"></i>
                                    </div>
                                    <div class="liked2">
                                       <i class="far fa-heart red"></i>
                                     </div>
                                     <div class="liked3">
                                         <a class="fas fa-download blu" href="${song.path}" download ></a>
                                     </div>
                                 </li>
                                
                                </i>
                              
                            </div>
                        </div>
                    `;
    });

    playlist.innerHTML = htmls.join("");
    const liked = $(".liked");
    const liked1 = $(".liked1");
    const liked2 = $(".liked2");
    const liked3 = $(".liked3");
  
    liked2.onclick = function(){
       liked.classList.add('playing',)

     
    }
    liked1.onclick = function(){
       liked.classList.remove("playing",)
    }

  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();
    
    

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // Xử lý khi thả tim
  
    
    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
