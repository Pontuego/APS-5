// =====================================================
// APS-5 Complementary JavaScript Module
// Autor: ChatGPT
// Objetivo:
// Arquivo utilitário para complementar o projeto.
// Inclui:
// - Requisições HTTP
// - Manipulação de LocalStorage
// - Validação de formulários
// - Feedback visual
// - Helpers reutilizáveis
// =====================================================

class APSHelper {
  // =============================
  // HTTP REQUESTS
  // =============================
  static async get(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GET ERROR:', error);
      APSHelper.showMessage('Erro ao buscar dados.', 'error');
    }
  }

  static async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      APSHelper.showMessage('Dados enviados com sucesso!', 'success');

      return await response.json();
    } catch (error) {
      console.error('POST ERROR:', error);
      APSHelper.showMessage('Erro ao enviar dados.', 'error');
    }
  }

  // =============================
  // LOCAL STORAGE
  // =============================
  static saveLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getLocal(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static removeLocal(key) {
    localStorage.removeItem(key);
  }

  // =============================
  // FORM VALIDATION
  // =============================
  static validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static validateEmptyFields(fields) {
    return fields.every(field => field.trim() !== '');
  }

  // =============================
  // VISUAL FEEDBACK
  // =============================
  static showMessage(message, type = 'info') {
    const alert = document.createElement('div');

    alert.textContent = message;
    alert.className = `aps-alert aps-${type}`;

    Object.assign(alert.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 18px',
      borderRadius: '8px',
      color: '#fff',
      fontFamily: 'Arial',
      zIndex: '9999',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: '0.3s ease'
    });

    const colors = {
      success: '#16a34a',
      error: '#dc2626',
      info: '#2563eb',
      warning: '#d97706'
    };

    alert.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }

  // =============================
  // LOADING SCREEN
  // =============================
  static showLoading() {
    const loader = document.createElement('div');
    loader.id = 'aps-loader';

    loader.innerHTML = `
      <div class="aps-spinner"></div>
    `;

    Object.assign(loader.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '99999'
    });

    const style = document.createElement('style');
    style.innerHTML = `
      .aps-spinner {
        width: 60px;
        height: 60px;
        border: 6px solid #ffffff;
        border-top: 6px solid #2563eb;
        border-radius: 50%;
        animation: aps-spin 1s linear infinite;
      }

      @keyframes aps-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(loader);
  }

  static hideLoading() {
    const loader = document.getElementById('aps-loader');
    if (loader) loader.remove();
  }

  // =============================
  // DATE FORMATTER
  // =============================
  static formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
}

// =====================================================
// EXEMPLOS DE USO
// =====================================================

// Validar e-mail
// console.log(APSHelper.validateEmail('teste@email.com'));

// Salvar no localStorage
// APSHelper.saveLocal('usuario', { nome: 'João' });

// Buscar dados
// APSHelper.get('https://jsonplaceholder.typicode.com/users');

// Enviar dados
// APSHelper.post('/api/login', {
//   email: 'teste@email.com',
//   senha: '123456'
// });

// Mostrar loading
// APSHelper.showLoading();
// setTimeout(() => APSHelper.hideLoading(), 2000);

// Mensagem visual
// APSHelper.showMessage('Sistema carregado!', 'success');

export default APSHelper;
