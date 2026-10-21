// Tela de cadastro/registro de usuários do InovaMed (plataforma de gestão em saúde).
// Valida os dados do formulário e salva os usuários no localStorage do navegador.

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de registro iniciado');

    // Referência ao formulário de registro
    const form = document.getElementById('form-registro');

    // Referências aos campos do formulário de cadastro
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmar_senha');
    const tipoPaciente = document.getElementById('tipoPaciente');
    const tipoMedico = document.getElementById('tipoMedico');
    const crm = document.getElementById('crm');
    const campoCRM = document.getElementById('campoCRM');

    // Lista no console e em um alerta todos os usuários já cadastrados
    window.mostrarUsuariosCadastrados = function() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        console.log('========== USUÁRIOS CADASTRADOS ==========');
        console.table(usuarios);
        
        if(usuarios.length === 0) {
            console.log('Nenhum usuário cadastrado ainda');
            alert('📭 Nenhum usuário cadastrado ainda');
        } else {
            console.log(`Total: ${usuarios.length} usuário(s)`);
            let mensagem = `📋 Total: ${usuarios.length} usuário(s)\n\n`;
            usuarios.forEach((u, index) => {
                mensagem += `${index + 1}. ${u.email} - ${u.nome} (${u.tipo})\n`;
            });
            alert(mensagem);
        }
        
        return usuarios;
    }

    // Remove do localStorage todos os usuários cadastrados, mediante confirmação
    window.limparTodosUsuarios = function() {
        if(confirm('⚠️ Isso vai apagar TODOS os usuários cadastrados. Continuar?')) {
            localStorage.removeItem('usuarios');
            console.log('🗑️ Todos os usuários foram removidos');
            alert('✅ Todos os usuários foram removidos!');
            location.reload(); // Recarrega a página
        }
    }

    // Exibe uma mensagem de erro amigável abaixo do campo quando o usuário preenche algo incorretamente
    function criarMensagemErro(campo, texto) {
        // Remove mensagem existente
        const msgExistente = campo.parentNode.querySelector('.msg-erro');
        if (msgExistente) msgExistente.remove();

        // Cria a nova mensagem de erro
        const msg = document.createElement('div');
        msg.className = 'msg-erro';
        msg.textContent = texto;
        msg.style.cssText = `
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
            padding: 5px 0;
        `;
        
        campo.parentNode.appendChild(msg);
        campo.style.borderColor = '#dc3545';
        campo.style.borderWidth = '2px';
    }
    
    // Remove a mensagem de erro de um campo e restaura seu estilo original
    function removerMensagemErro(campo) {
        const msgExistente = campo.parentNode.querySelector('.msg-erro');
        if (msgExistente) msgExistente.remove();
        campo.style.borderColor = '';
        campo.style.borderWidth = '';
    }
    
    // Destaca o campo em verde para indicar que foi preenchido corretamente
    function mostrarSucesso(campo) {
        campo.style.borderColor = '#28a745';
        campo.style.borderWidth = '2px';
    }
    
    // Exibe uma mensagem geral de erro ou sucesso no topo do formulário
    function mostrarMensagemGeral(texto, tipo) {
        // Remove mensagem existente
        const msgExistente = document.querySelector('.msg-geral');
        if (msgExistente) msgExistente.remove();
        
        // Cria nova mensagem
        const msg = document.createElement('div');
        msg.className = 'msg-geral';
        msg.textContent = texto;
        msg.style.cssText = `
            padding: 12px;
            margin-bottom: 20px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            ${tipo === 'erro' 
                ? 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' 
                : 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;'}
        `;
        
        form.insertBefore(msg, form.firstChild);
        
        // Remove após 3 segundos se for sucesso
        if (tipo === 'sucesso') {
            setTimeout(() => msg.remove(), 3000);
        }
    }

    // Valida em tempo real se a confirmação de senha coincide com a senha digitada
    confirmarSenha.addEventListener('input', function() {
        if (senha.value !== confirmarSenha.value) {
            criarMensagemErro(confirmarSenha, 'As senhas não coincidem');
            criarMensagemErro(senha, 'As senhas não coincidem');
        } else if (confirmarSenha.value) {
            removerMensagemErro(confirmarSenha);
            removerMensagemErro(senha);
            mostrarSucesso(confirmarSenha);
            mostrarSucesso(senha);
        }
    });
    
    // Revalida a confirmação de senha sempre que o campo de senha é alterado
    senha.addEventListener('input', function() {
        if (confirmarSenha.value && senha.value !== confirmarSenha.value) {
            criarMensagemErro(confirmarSenha, 'As senhas não coincidem');
            criarMensagemErro(senha, 'As senhas não coincidem');
        } else if (confirmarSenha.value && senha.value === confirmarSenha.value) {
            removerMensagemErro(confirmarSenha);
            removerMensagemErro(senha);
            mostrarSucesso(confirmarSenha);
            mostrarSucesso(senha);
        }
    });

    // Exibe ou oculta o campo de CRM conforme o usuário escolhe médico ou paciente
    if (tipoMedico && tipoPaciente && campoCRM) {
        tipoMedico.addEventListener('change', function() {
            campoCRM.style.display = 'block';
        });
        
        tipoPaciente.addEventListener('change', function() {
            campoCRM.style.display = 'none';
        });
    }
    
    // Valida todos os campos no envio e, se estiverem corretos, cadastra o novo usuário
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Limpar mensagens anteriores
        document.querySelectorAll('.msg-erro').forEach(msg => msg.remove());
        
        let temErro = false;
        
        // 1. Validar nome
        if (!nome.value.trim()) {
            criarMensagemErro(nome, 'Digite seu nome completo');
            temErro = true;
        } else if (nome.value.trim().length < 3) {
            criarMensagemErro(nome, 'Nome deve ter pelo menos 3 caracteres');
            temErro = true;
        }
        
        // 2. Validar email
        if (!email.value.trim()) {
            criarMensagemErro(email, 'Digite seu e-mail');
            temErro = true;
        } else if (!validarEmail(email.value.trim())) {
            criarMensagemErro(email, 'Digite um e-mail válido (ex: nome@email.com)');
            temErro = true;
        }
        
        // 3. Validar senha
        if (!senha.value) {
            criarMensagemErro(senha, 'Digite uma senha');
            temErro = true;
        } else if (senha.value.length < 4) {
            criarMensagemErro(senha, 'A senha deve ter pelo menos 4 caracteres');
            temErro = true;
        }
        
        // 4. Validar confirmação de senha
        if (!confirmarSenha.value) {
            criarMensagemErro(confirmarSenha, 'Confirme sua senha');
            temErro = true;
        } else if (senha.value !== confirmarSenha.value) {
            criarMensagemErro(confirmarSenha, 'As senhas não coincidem');
            criarMensagemErro(senha, 'As senhas não coincidem');
            temErro = true;
        }
        
        // 5. Validar CRM para médicos
        const tipoSelecionado = document.querySelector('input[name="tipo"]:checked').value;
        if (tipoSelecionado === 'medico') {
            if (!crm.value.trim()) {
                criarMensagemErro(crm, 'CRM é obrigatório para médicos');
                temErro = true;
            } else if (crm.value.trim().length < 4) {
                criarMensagemErro(crm, 'CRM inválido');
                temErro = true;
            }
        }
        
        // 6. Verificar se email já existe (USANDO JSON DO LOCALSTORAGE)
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Mostrar no console para depuração
        console.log('📋 Usuários cadastrados:', usuarios);
        console.log('📧 Email digitado:', email.value.trim());
        
        if (usuarios.some(u => u.email === email.value.trim())) {
            criarMensagemErro(email, 'Este e-mail já está cadastrado');
            temErro = true;
        }
        
        // Se tem erro, mostra mensagem geral e para
        if (temErro) {
            mostrarMensagemGeral('Corrija os erros acima antes de continuar', 'erro');
            
            // Scroll para o primeiro erro
            const primeiroErro = document.querySelector('.msg-erro');
            if (primeiroErro) {
                primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Todos os campos foram validados: cria e salva o novo usuário

        // Criar usuário
        const novoUsuario = {
            id: Date.now(), // Usando timestamp para ID único
            nome: nome.value.trim(),
            email: email.value.trim(),
            senha: btoa(senha.value), // Senha codificada em base64
            tipo: tipoSelecionado,
            dataCadastro: new Date().toISOString(),
            ativo: true
        };
        
        if (tipoSelecionado === 'medico') {
            novoUsuario.crm = crm.value.trim();
        }
        
        // Adicionar ao array e salvar no JSON
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        console.log('✅ Usuário cadastrado com sucesso!');
        console.log('📦 Dados salvos:', novoUsuario);
        console.log('📊 Total de usuários no sistema:', usuarios.length);
        
        // Mostrar o JSON salvo (para você ver como fica)
        console.log('📁 JSON salvo:', localStorage.getItem('usuarios'));
        
        // Mostrar mensagem de sucesso
        mostrarMensagemGeral('✅ Cadastro realizado com sucesso! Redirecionando...', 'sucesso');
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
    
    // Verifica se o e-mail informado tem um formato válido
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Mostrar no console quantos usuários já existem ao carregar a página
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(`📊 Sistema carregado com ${usuariosExistentes.length} usuário(s) cadastrado(s)`);
    if(usuariosExistentes.length > 0) {
        console.log('📧 Emails cadastrados:', usuariosExistentes.map(u => u.email));
    }
});