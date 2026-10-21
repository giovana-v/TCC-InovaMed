// Dashboard do paciente da plataforma InovaMed.
// Controla o usuário logado, o carrossel de campanhas e o agendamento de consultas.

document.addEventListener('DOMContentLoaded', function() {

    // Define o usuário logado padrão exibido no painel do paciente
    let usuarioLogado = {
        nome: 'Giovana Soares',
        tipo: 'Paciente',
        email: 'giovana.soares@email.com',
        avatar: 'GS'
    };
    
    // Carregar usuário do localStorage ou salvar padrão
    const storedUser = localStorage.getItem('usuario_logado');
    if (storedUser) {
        usuarioLogado = JSON.parse(storedUser);
    } else {
        localStorage.setItem('usuario_logado', JSON.stringify(usuarioLogado));
    }
    
    // Preenche a interface (avatar, nome, boas-vindas e campo do paciente) com os dados do usuário logado
    function atualizarInterfaceComUsuarioLogado() {
        // Atualizar avatar
        const profileAvatar = document.getElementById('profileAvatar');
        if (profileAvatar) {
            profileAvatar.textContent = usuarioLogado.avatar || 
                usuarioLogado.nome.split(' ').map(n => n[0]).join('').toUpperCase();
        }
        
        // Atualizar nome no perfil
        const profileName = document.getElementById('profileName');
        if (profileName) {
            profileName.innerHTML = `${usuarioLogado.nome} <span>${usuarioLogado.tipo}</span>`;
        }
        
        // Atualizar mensagem de boas-vindas
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Bem-vindo, ${usuarioLogado.nome}!`;
        }
        
        // Preenche o campo de nome do paciente como somente leitura
        const patientNameInput = document.getElementById('patientName');
        if (patientNameInput) {
            patientNameInput.value = usuarioLogado.nome;
            patientNameInput.setAttribute('readonly', 'readonly');
        }
    }
    
    // Carrossel de campanhas de saúde exibido na página inicial do paciente
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (slides.length && dots.length) {
        let currentSlide = 0;
        let interval;
        let isPlaying = true;
        const intervalTime = 4000;
        
        // Exibe o slide e o indicador correspondentes ao índice informado
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            if (slides[index]) slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
        }
        
        // Avança para o próximo slide do carrossel
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Inicia a troca automática de slides em intervalos regulares
        function startCarousel() {
            if (interval) clearInterval(interval);
            interval = setInterval(() => { if (isPlaying) nextSlide(); }, intervalTime);
        }
        
        // Interrompe a troca automática de slides
        function stopCarousel() {
            if (interval) { clearInterval(interval); interval = null; }
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopCarousel();
                startCarousel();
            });
        });
        
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => { isPlaying = false; stopCarousel(); });
            carouselContainer.addEventListener('mouseleave', () => { isPlaying = true; startCarousel(); });
        }
        
        showSlide(0);
        startCarousel();
    }
    
    // Exibe um alerta visual personalizado (sucesso, erro, aviso ou informação) para o paciente
    function mostrarAlertaPersonalizado(titulo, mensagem, tipo, detalhes) {
        const alertExistente = document.querySelector('.custom-alert-overlay');
        if (alertExistente) alertExistente.remove();
        
        let icone = '';
        if (tipo === 'sucesso') icone = '✓';
        else if (tipo === 'erro') icone = '✗';
        else if (tipo === 'alerta') icone = '⚠';
        else icone = 'ℹ';
        
        const alertHTML = `
            <div class="custom-alert-overlay">
                <div class="custom-alert-container ${tipo}">
                    <div class="custom-alert-header">
                        <span class="alert-icon">${icone}</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="custom-alert-body">
                        <p>${mensagem}</p>
                        ${detalhes ? `<div class="alert-detalhes">${detalhes}</div>` : ''}
                    </div>
                    <div class="custom-alert-footer">
                        <button class="btn-fechar-alerta" onclick="this.closest('.custom-alert-overlay').remove()">OK</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        
        setTimeout(() => {
            const alerta = document.querySelector('.custom-alert-overlay');
            if (alerta) alerta.remove();
        }, 4000);
    }
    
    // Mapa de médicos disponíveis para cada especialidade oferecida no agendamento
    const medicosPorEspecialidade = {
        'Clínica Geral': [
            { nome: 'Dr. Carlos Silva', crm: '12345-SP' },
            { nome: 'Dra. Mariana Costa', crm: '45678-SP' }
        ],
        'Cardiologia': [
            { nome: 'Dr. Carlos Silva', crm: '12345-SP' }
        ],
        'Dermatologia': [
            { nome: 'Dr. Roberto Santos', crm: '34567-SP' },
            { nome: 'Dra. Camila Ferreira', crm: '89012-SP' }
        ],
        'Oftalmologia': [
            { nome: 'Dra. Camila Ferreira', crm: '89012-SP' }
        ],
        'Odontologia': [
            { nome: 'Dr. Paulo Mendes', crm: '56789-SP' }
        ],
        'Pediatria': [
            { nome: 'Dra. Ana Oliveira', crm: '23456-SP' },
            { nome: 'Dr. Ricardo Martins', crm: '78901-SP' }
        ],
        'Ginecologia': [
            { nome: 'Dra. Mariana Costa', crm: '45678-SP' }
        ],
        'Ortopedia': [
            { nome: 'Dr. Paulo Mendes', crm: '56789-SP' }
        ]
    };
    
    // Lista de consultas agendadas mantida em memória e sincronizada com o localStorage
    let consultasAgendadas = [];

    // Carrega as consultas do localStorage ou cria consultas de exemplo na primeira execução
    function carregarConsultas() {
        const saved = localStorage.getItem('consultas_agendadas');
        if (saved) {
            consultasAgendadas = JSON.parse(saved);
        } else {
            const hoje = new Date();
            consultasAgendadas = [
                { id: 1, data: formatarDataParaExibir(new Date(hoje.getTime() + 86400000)), horario: '09:00', medico: 'Dr. Carlos Silva', especialidade: 'Cardiologia', status: 'confirmado', paciente: 'Giovana Soares' },
                { id: 2, data: formatarDataParaExibir(new Date(hoje.getTime() + 3 * 86400000)), horario: '14:30', medico: 'Dra. Ana Oliveira', especialidade: 'Pediatria', status: 'agendado', paciente: 'Giovana Soares' },
                { id: 3, data: formatarDataParaExibir(new Date(hoje.getTime() + 5 * 86400000)), horario: '10:00', medico: 'Dr. Roberto Santos', especialidade: 'Dermatologia', status: 'pendente', paciente: 'Giovana Soares' }
            ];
            salvarConsultas();
        }
        renderizarConsultas();
    }
    
    // Converte um objeto Date para o formato de exibição dd/mm/aaaa
    function formatarDataParaExibir(data) {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    
    // Persiste a lista de consultas agendadas no localStorage
    function salvarConsultas() {
        localStorage.setItem('consultas_agendadas', JSON.stringify(consultasAgendadas));
    }
    
    // Cria uma nova consulta para o paciente logado, salva e atualiza a tabela
    function adicionarConsulta(novaConsulta) {
        const novoId = consultasAgendadas.length > 0 ? Math.max(...consultasAgendadas.map(c => c.id)) + 1 : 1;
        const consulta = {
            id: novoId,
            data: novaConsulta.data,
            horario: novaConsulta.horario,
            medico: novaConsulta.medico,
            especialidade: novaConsulta.especialidade,
            status: 'agendado',
            paciente: usuarioLogado.nome  // associa a consulta ao usuário logado
        };
        consultasAgendadas.push(consulta);
        salvarConsultas();
        renderizarConsultas();
        return consulta;
    }
    
    // Monta a tabela de consultas futuras do paciente logado, ordenadas por data
    function renderizarConsultas() {
        const tbody = document.getElementById('tabelaConsultasBody');
        if (!tbody) return;
        
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        // Filtra apenas as consultas futuras e não canceladas do usuário logado
        const consultasFuturas = consultasAgendadas.filter(c => {
            const [dia, mes, ano] = c.data.split('/');
            const dataConsulta = new Date(ano, mes - 1, dia);
            return dataConsulta >= hoje && c.status !== 'cancelado' && c.paciente === usuarioLogado.nome;
        });
        
        consultasFuturas.sort((a, b) => {
            const [diaA, mesA, anoA] = a.data.split('/');
            const [diaB, mesB, anoB] = b.data.split('/');
            return new Date(anoA, mesA - 1, diaA) - new Date(anoB, mesB - 1, diaB);
        });
        
        if (consultasFuturas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px;">
                        Nenhuma consulta agendada. Use o formulário ao lado para marcar sua consulta!
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = '';
        consultasFuturas.forEach(consulta => {
            let statusClass = '';
            let statusText = '';
            
            switch(consulta.status) {
                case 'confirmado':
                    statusClass = 'status-confirmado';
                    statusText = 'Confirmado';
                    break;
                case 'agendado':
                    statusClass = 'status-agendado';
                    statusText = 'Agendado';
                    break;
                case 'pendente':
                    statusClass = 'status-pendente';
                    statusText = 'Pendente';
                    break;
                default:
                    statusClass = 'status-pendente';
                    statusText = consulta.status;
            }
            
            const row = tbody.insertRow();
            row.innerHTML = `
                <td data-label="Data">${consulta.data}</td>
                <td data-label="Horário">${consulta.horario}</td>
                <td data-label="Médico">${consulta.medico}</td>
                <td data-label="Especialidade">${consulta.especialidade}</td>
                <td data-label="Status"><span class="status ${statusClass}">${statusText}</span></td>
            `;
        });
    }
    
    // Formulário de marcação de consultas e seus campos de especialidade e médico
    const form = document.getElementById('appointmentForm');
    const especialidadeSelect = document.getElementById('appointmentType');
    const medicoSelect = document.getElementById('doctorName');
    
    // Preenche o seletor de médicos conforme a especialidade escolhida no formulário
    function atualizarMedicosPorEspecialidade() {
        const especialidade = especialidadeSelect.value;
        
        medicoSelect.innerHTML = '<option value="">Selecione um médico...</option>';
        
        if (especialidade && medicosPorEspecialidade[especialidade]) {
            medicoSelect.disabled = false;
            medicosPorEspecialidade[especialidade].forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.nome;
                option.textContent = `${medico.nome} (CRM: ${medico.crm})`;
                medicoSelect.appendChild(option);
            });
        } else if (especialidade) {
            medicoSelect.disabled = true;
            const option = document.createElement('option');
            option.value = "";
            option.textContent = `Nenhum médico disponível para ${especialidade}`;
            medicoSelect.appendChild(option);
        } else {
            medicoSelect.disabled = false;
        }
    }
    
    if (especialidadeSelect) {
        especialidadeSelect.addEventListener('change', atualizarMedicosPorEspecialidade);
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Usa o nome do usuário logado, já que o campo é somente leitura
            const paciente = usuarioLogado.nome;
            const data = document.getElementById('appointmentDate').value;
            const horario = document.getElementById('appointmentTime').value;
            const especialidade = especialidadeSelect.value;
            const medico = medicoSelect.value;
            const observacoes = document.getElementById('observacoes').value;
            
            if (!data) {
                mostrarAlertaPersonalizado('Campo Obrigatório', 'Por favor, selecione a data da consulta!', 'alerta');
                return;
            }
            if (!horario) {
                mostrarAlertaPersonalizado('Campo Obrigatório', 'Por favor, selecione o horário da consulta!', 'alerta');
                return;
            }
            if (!especialidade) {
                mostrarAlertaPersonalizado('Campo Obrigatório', 'Por favor, selecione uma especialidade!', 'alerta');
                return;
            }
            if (!medico || medico === 'Selecione um médico...') {
                mostrarAlertaPersonalizado('Campo Obrigatório', 'Por favor, selecione um médico!', 'alerta');
                return;
            }
            
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const dataSelecionada = new Date(data);
            
            if (dataSelecionada < hoje) {
                mostrarAlertaPersonalizado('Data Inválida', 'A data da consulta deve ser hoje ou uma data futura!', 'erro');
                return;
            }
            
            const hora = parseInt(horario.split(':')[0]);
            if (hora < 8 || hora > 18) {
                mostrarAlertaPersonalizado('Horário Inválido', 'O horário de atendimento é das 08:00 às 18:00!', 'erro');
                return;
            }
            
            const [ano, mes, dia] = data.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;
            
            const consultaExistente = consultasAgendadas.find(c => 
                c.data === dataFormatada && c.horario === horario && c.status !== 'cancelado'
            );
            
            if (consultaExistente) {
                mostrarAlertaPersonalizado('Conflito de Horário', 'Já existe uma consulta agendada para este dia e horário!', 'erro');
                return;
            }
            
            adicionarConsulta({
                paciente: paciente,
                data: dataFormatada,
                horario: horario,
                medico: medico,
                especialidade: especialidade,
                observacoes: observacoes
            });
            
            // Limpa o formulário mantendo o nome do paciente preenchido
            document.getElementById('appointmentDate').value = '';
            document.getElementById('appointmentTime').value = '';
            medicoSelect.innerHTML = '<option value="">Selecione primeiro uma especialidade...</option>';
            especialidadeSelect.value = '';
            document.getElementById('observacoes').value = '';
            
            mostrarAlertaPersonalizado('Consulta Agendada!', 'Sua consulta foi agendada com sucesso!', 'sucesso');
            
            document.querySelector('.consultas-card')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Inicializa o painel: carrega os dados do usuário e as consultas agendadas
    atualizarInterfaceComUsuarioLogado();
    carregarConsultas();
    
    console.log('Dashboard inicializado com sucesso!');
    console.log(`Usuário logado: ${usuarioLogado.nome}`);
});