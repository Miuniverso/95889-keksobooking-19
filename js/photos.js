'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form-header__upload').querySelector('input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoApartmentsChooser = document.querySelector('.ad-form__upload').querySelector('input[type=file]');
  var photoApartmentsPreview = document.querySelector('.ad-form__photo');
  var photoPreviewSize = {
    width: 40,
    height: 40
  };

  function generatePhoto() {
    // проверка на наличие фото
    if (document.querySelector('.ad-form__photo').querySelector('img')) {
      document.querySelector('.ad-form__photo').querySelector('img').remove();
    }
    var photo = document.createElement('img');

    photo.width = photoPreviewSize.width;
    photo.height = photoPreviewSize.height;
    photo.alt = 'Фото жилья';
    photoApartmentsPreview.appendChild(photo);

    return photo;
  }

  function addPhoto(photoChooser, photo) {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photo.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function onChangeAvatar() {
    addPhoto(avatarChooser, avatarPreview);
  }

  function onChangePhoto() {
    addPhoto(photoApartmentsChooser, generatePhoto());
  }

  avatarChooser.addEventListener('change', onChangeAvatar);
  photoApartmentsChooser.addEventListener('change', onChangePhoto);
})();
