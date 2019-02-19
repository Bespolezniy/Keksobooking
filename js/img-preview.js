'use strict';

/*модуль превью изображений формы*/
(function () {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileSelect = document.querySelector('.ad-form-header__input');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoFileSelect = document.querySelector('.ad-form__input');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');

  /*превью изображений*/
  var addImgForm = function (file, field, callback) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {

    return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(field, reader);
      });

      reader.readAsDataURL(file);
    }
  };

  /*добавление автара*/
  var addAvatar = function (field, reader) {
    field.src = reader.result;
  };

  /*добавление фото*/
  var addPhoto = function (field, reader) {
    field.src = reader.result;
    window.data.previewPhoto.appendChild(field);
  };

  /*событие изменения аватарки*/
  var onAvatarChange = function () {
    var file = document.querySelector('.ad-form-header__input').files[0];

    addImgForm(file, window.data.previewAvatar, addAvatar);
  };

  avatarFileSelect.addEventListener('change', onAvatarChange);

  /*добавление*/
  var addFileSelectDrop = function (evt, field, callback) {
    var file = evt.dataTransfer.files[0];

    evt.stopPropagation();/*остановка*/
    evt.preventDefault();
    addImgForm(file, field, callback);
  };

  /*перетаскивание*/
  var onСaptureFileDragover = function (evt) {
    evt.stopPropagation();/*остановка*/
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  avatarDropZone.addEventListener('dragover', onСaptureFileDragover);

  avatarDropZone.addEventListener('drop', function (evt) {
    addFileSelectDrop(evt, window.data.previewAvatar, addAvatar);
  });

  /*создание изображения*/
  var createImg = function () {
    var img = document.createElement('img');
    img.width = '70';
    img.height = '70';
    img.alt = 'Фотография жилья';

    return img;
  };

  /*событие изменения фото*/
  var onPhotoChange = function () {
    var file = document.querySelector('.ad-form__input').files[0];
    var field = createImg();

    addImgForm(file, field, addPhoto);
  };

  photoFileSelect.addEventListener('change', onPhotoChange);
  photoDropZone.addEventListener('dragover', onСaptureFileDragover);

  /*бросаем*/
  photoDropZone.addEventListener('drop', function (evt) {
    var field = createImg();
    addFileSelectDrop(evt, field, addPhoto);
  });

  /*удаление*/
  window.avatar.removePhoto = function () {
    var photo = window.data.previewPhoto.children;
    if (photo) {
      for (var i = photo.length - 1; i >= 0; i--) {
        window.data.previewPhoto.removeChild(photo[i]);
      }
      return;
    }
   };

})();
