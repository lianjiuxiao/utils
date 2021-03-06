/**
 * Created by yakima on 2018/1/26.
 */
$utils.hook.ready(() => {
  const $navItemsWrapper = $('.nav .items');
  const $globalSearchBtn = $('#globalSearchBtn');
  const $globalSearchField = $('#globalSearchField');
  const $btnLogout = $('#btnLogout');

  function toGlobalSearch () {
    const keyword = $globalSearchField.val();
    if (!$utils.common.hasValue(keyword)) {
      $utils.modal.alert({ content: '请先输入关键词再搜索！' });
      return;
    }
    $utils.route.go({
      path: '/search/list',
      query: { keyword }
    });
  }

  // $('.lazyload').lazyload({ effect: 'fadeIn' });

  $globalSearchField.change(function (e) {
    const $this = $(this);
    $this.val($utils.string.trimSpaces($this.val()));
  }).keydown(function (e) {
    const isEnterBtnPressed = $utils.string.getString(e.keyCode) === '13';
    if (isEnterBtnPressed) {
      toGlobalSearch();
    }
  });
  $globalSearchBtn.click(toGlobalSearch);

  // 整站顶部菜单鼠标跟随效果
  $navItemsWrapper.append('<span class="nav-bottom-line"></span>');
  const $navBottomLine = $navItemsWrapper.find('.nav-bottom-line');
  $navItemsWrapper.hover(function () {
    $navBottomLine.stop(true, true).fadeIn(400);
  }, function () {
    $navBottomLine.stop(true, true).fadeOut(400);
  });
  $navItemsWrapper.on('mouseover', '.link', function () {
    const $this = $(this);
    $navBottomLine.stop(true, true).animate({
      left: $this.position().left + 'px',
      width: parseInt($this.css('width'), 10) + parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10)
    }, 100, 'swing');
  });

  if ($btnLogout.length > 0) {
    $btnLogout.click(function (e) {
      e.preventDefault();
      $utils.storage.clearSessionData();
      $utils.route.go({ path: '/login' });
    });
  }
});
