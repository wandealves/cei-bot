import CeiService from './services/cei.service';

(async () => {
  const ceiService: CeiService = new CeiService({
    login: '47782704014',
    password: 'ewqqw324234',
  });

  await ceiService.loginAsync();
})();
