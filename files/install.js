'Use strict';
let deferredInstallPrompt = null;
const installButton = document.getElementById('buttoninstall');

installButton.addEventListener('click',installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt){
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
    console.log('saveBeforeInstall el PWA');
}

function  installPWA(evt){
    deferredInstallPrompt.prompt();
    evt.srcElement.setAttribute('hidden',true);
    deferredInstallPrompt.userChoice.then((choice)=>{
        if (choice.outcome === 'accepted'){
            console.log('Aceptado')
        } else {
            console.log('Rechazado')
        }
    deferredInstallPrompt = null;
    })
}

window.addEventListener('appinstalled',(evt)=>{
    console.log("Juego Instalado");
})