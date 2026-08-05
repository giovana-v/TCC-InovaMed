document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== //
    // NOTIFICAÇÕES PERSONALIZADAS //
    // ==================== //
    
    // Função para mostrar confirmação personalizada
    function mostrarConfirmacaoPersonalizada(titulo, mensagem, onConfirm, onCancel) {
        const overlayExistente = document.querySelector('.confirmacao-overlay');
        if (overlayExistente) overlayExistente.remove();
        
        const confirmHTML = `
            <div class="confirmacao-overlay">
                <div class="confirmacao-container">
                    <div class="confirmacao-header">
                        <span class="confirmacao-icon">?</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="confirmacao-body">
                        <p>${mensagem}</p>
                    </div>
                    <div class="confirmacao-footer">
                        <button class="btn-confirmar-sim" id="btnConfirmarSim">Sim</button>
                        <button class="btn-confirmar-nao" id="btnConfirmarNao">Não</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', confirmHTML);
        
        document.getElementById('btnConfirmarSim')?.addEventListener('click', () => {
            document.querySelector('.confirmacao-overlay')?.remove();
            if (onConfirm) onConfirm();
        });
        
        document.getElementById('btnConfirmarNao')?.addEventListener('click', () => {
            document.querySelector('.confirmacao-overlay')?.remove();
            if (onCancel) onCancel();
        });
    }
    
    // Função para mostrar alerta personalizado
    function mostrarAlertaPersonalizado(titulo, mensagem, tipo) {
        const overlayExistente = document.querySelector('.alerta-overlay');
        if (overlayExistente) overlayExistente.remove();
        
        let corHeader = '';
        let icone = '';
        
        if (tipo === 'sucesso') {
            corHeader = 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)';
            icone = '✓';
        } else if (tipo === 'erro') {
            corHeader = 'linear-gradient(135deg, #dc3545 0%, #b02a37 100%)';
            icone = '✗';
        } else {
            corHeader = 'linear-gradient(135deg, #2c7da0 0%, #1f5f7a 100%)';
            icone = 'ℹ';
        }
        
        const alertHTML = `
            <div class="alerta-overlay">
                <div class="alerta-container">
                    <div class="alerta-header" style="background: ${corHeader};">
                        <span class="alerta-icon">${icone}</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="alerta-body">
                        <p>${mensagem}</p>
                    </div>
                    <div class="alerta-footer">
                        <button class="btn-fechar-alerta">OK</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        
        document.querySelector('.btn-fechar-alerta')?.addEventListener('click', () => {
            document.querySelector('.alerta-overlay')?.remove();
        });
        
        setTimeout(() => {
            document.querySelector('.alerta-overlay')?.remove();
        }, 3000);
    }
    
    // ==================== //
    // ESTILOS DAS NOTIFICAÇÕES //
    // ==================== //
    
    const estilosNotificacoes = document.createElement('style');
    estilosNotificacoes.textContent = `
        .confirmacao-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.2s ease;
        }
        
        .confirmacao-container {
            background-color: #ffffff;
            border-radius: 20px;
            width: 90%;
            max-width: 400px;
            overflow: hidden;
            animation: slideIn 0.3s ease;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
        }
        
        .confirmacao-header {
            background: linear-gradient(135deg, #2c7da0 0%, #1f5f7a 100%);
            padding: 20px 25px;
            color: white;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .confirmacao-icon {
            font-size: 28px;
            font-weight: bold;
        }
        
        .confirmacao-header h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }
        
        .confirmacao-body {
            padding: 25px;
            text-align: center;
            color: #2c3e50;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .confirmacao-footer {
            padding: 15px 25px;
            border-top: 1px solid #e8ecef;
            display: flex;
            justify-content: center;
            gap: 15px;
        }
        
        .btn-confirmar-sim {
            background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-confirmar-sim:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
        }
        
        .btn-confirmar-nao {
            background-color: #f0f2f5;
            color: #5a6e7c;
            border: 1px solid #d0d7de;
            padding: 10px 25px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-confirmar-nao:hover {
            background-color: #e8ecef;
            transform: translateY(-2px);
        }
        
        .alerta-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.2s ease;
        }
        
        .alerta-container {
            background-color: #ffffff;
            border-radius: 20px;
            width: 90%;
            max-width: 380px;
            overflow: hidden;
            animation: slideIn 0.3s ease;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
        }
        
        .alerta-header {
            padding: 20px 25px;
            color: white;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .alerta-icon {
            font-size: 28px;
            font-weight: bold;
        }
        
        .alerta-header h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
        }
        
        .alerta-body {
            padding: 25px;
            text-align: center;
            color: #2c3e50;
            font-size: 15px;
        }
        
        .alerta-footer {
            padding: 15px 25px;
            border-top: 1px solid #e8ecef;
            display: flex;
            justify-content: center;
        }
        
        .btn-fechar-alerta {
            background: linear-gradient(135deg, #2c7da0 0%, #1f5f7a 100%);
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-fechar-alerta:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 125, 160, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(estilosNotificacoes);
    
    // ==================== //
    // DADOS DE EXEMPLO     //
    // ==================== //
    
    // Exibir nome do médico
    const medicoNomeSpan = document.getElementById('medicoNome');
    if (medicoNomeSpan) {
        medicoNomeSpan.innerHTML = `Dr. Carlos Silva`;
    }
    
    // Data atual para referência
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const dia = hoje.getDate();
    
    function formatarData(d, m, a) {
        return `${d.toString().padStart(2, '0')}/${(m+1).toString().padStart(2, '0')}/${a}`;
    }
    
    const consultas = [
        // Consultas de HOJE
        { id: 1, data: formatarData(dia, mes, ano), horario: '08:00', paciente: 'Ana Beatriz Souza', idade: 34, tipo: 'Consulta', status: 'confirmado', telefone: '(11) 98765-4321', email: 'ana.souza@email.com', convenio: 'Unimed', observacoes: 'Paciente com dores de cabeça frequentes' },
        { id: 2, data: formatarData(dia, mes, ano), horario: '09:30', paciente: 'Carlos Eduardo Lima', idade: 45, tipo: 'Retorno', status: 'confirmado', telefone: '(11) 91234-5678', email: 'carlos.lima@email.com', convenio: 'Amil', observacoes: 'Acompanhamento de hipertensão' },
        { id: 3, data: formatarData(dia, mes, ano), horario: '11:00', paciente: 'Fernanda Oliveira', idade: 28, tipo: 'Consulta', status: 'pendente', telefone: '(11) 99876-5432', email: 'fernanda.oliveira@email.com', convenio: 'SulAmérica', observacoes: 'Primeira consulta - dor abdominal' },
        
        // Consultas do dia 14
        { id: 4, data: formatarData(14, mes, ano), horario: '09:00', paciente: 'Rafael Santos', idade: 42, tipo: 'Consulta', status: 'confirmado', telefone: '(11) 91234-5678', email: 'rafael.santos@email.com', convenio: 'Unimed', observacoes: 'Check-up anual' },
        { id: 5, data: formatarData(14, mes, ano), horario: '10:30', paciente: 'Camila Lima', idade: 29, tipo: 'Retorno', status: 'agendado', telefone: '(11) 92345-6789', email: 'camila.lima@email.com', convenio: 'Amil', observacoes: 'Acompanhamento de tratamento' },
        { id: 6, data: formatarData(14, mes, ano), horario: '14:00', paciente: 'Thiago Oliveira', idade: 51, tipo: 'Exame', status: 'agendado', telefone: '(11) 93456-7890', email: 'thiago.oliveira@email.com', convenio: 'SulAmérica', observacoes: 'Resultado de exames' },
        
        // Consultas do dia 18
        { id: 7, data: formatarData(18, mes, ano), horario: '08:00', paciente: 'Mariana Costa', idade: 36, tipo: 'Consulta', status: 'confirmado', telefone: '(11) 94567-8901', email: 'mariana.costa@email.com', convenio: 'Bradesco Saúde', observacoes: 'Dores nas costas' },
        { id: 8, data: formatarData(18, mes, ano), horario: '11:00', paciente: 'Lucas Almeida', idade: 27, tipo: 'Retorno', status: 'agendado', telefone: '(11) 95678-9012', email: 'lucas.almeida@email.com', convenio: 'Unimed', observacoes: 'Controle de ansiedade' },
        { id: 9, data: formatarData(18, mes, ano), horario: '15:30', paciente: 'Isabela Ferreira', idade: 48, tipo: 'Consulta', status: 'pendente', telefone: '(11) 96789-0123', email: 'isabela.ferreira@email.com', convenio: 'Amil', observacoes: 'Pressão alta' },
        
        // Consultas do dia 19
        { id: 10, data: formatarData(19, mes, ano), horario: '09:30', paciente: 'Gustavo Rocha', idade: 33, tipo: 'Consulta', status: 'confirmado', telefone: '(11) 97890-1234', email: 'gustavo.rocha@email.com', convenio: 'SulAmérica', observacoes: 'Alergias sazonais' },
        { id: 11, data: formatarData(19, mes, ano), horario: '13:00', paciente: 'Amanda Silva', idade: 25, tipo: 'Retorno', status: 'agendado', telefone: '(11) 98901-2345', email: 'amanda.silva@email.com', convenio: 'Bradesco Saúde', observacoes: 'Acompanhamento pré-natal' },
        { id: 12, data: formatarData(19, mes, ano), horario: '16:00', paciente: 'Felipe Santos', idade: 44, tipo: 'Exame', status: 'agendado', telefone: '(11) 99012-3456', email: 'felipe.santos@email.com', convenio: 'Unimed', observacoes: 'Exame de rotina' },
        
        // Consultas do dia 21
        { id: 13, data: formatarData(21, mes, ano), horario: '08:30', paciente: 'Patrícia Souza', idade: 38, tipo: 'Consulta', status: 'confirmado', telefone: '(11) 90123-4567', email: 'patricia.souza@email.com', convenio: 'Amil', observacoes: 'Dor de cabeça frequente' },
        { id: 14, data: formatarData(21, mes, ano), horario: '10:00', paciente: 'Rodrigo Lima', idade: 41, tipo: 'Retorno', status: 'agendado', telefone: '(11) 91234-5678', email: 'rodrigo.lima@email.com', convenio: 'SulAmérica', observacoes: 'Controle de diabetes' },
        { id: 15, data: formatarData(21, mes, ano), horario: '14:30', paciente: 'Cristina Oliveira', idade: 53, tipo: 'Consulta', status: 'pendente', telefone: '(11) 92345-6789', email: 'cristina.oliveira@email.com', convenio: 'Bradesco Saúde', observacoes: 'Dores articulares' },
        
        // Consultas do dia 24
        { id: 16, data: formatarData(24, mes, ano), horario: '09:00', paciente: 'Bruno Costa', idade: 31, tipo: 'Consulta', status: 'confirmado', telefone: '(11) 93456-7890', email: 'bruno.costa@email.com', convenio: 'Unimed', observacoes: 'Problemas respiratórios' },
        { id: 17, data: formatarData(24, mes, ano), horario: '11:30', paciente: 'Vanessa Almeida', idade: 29, tipo: 'Retorno', status: 'agendado', telefone: '(11) 94567-8901', email: 'vanessa.almeida@email.com', convenio: 'Amil', observacoes: 'Acompanhamento psicológico' },
        { id: 18, data: formatarData(24, mes, ano), horario: '15:00', paciente: 'Anderson Ferreira', idade: 47, tipo: 'Exame', status: 'agendado', telefone: '(11) 95678-9012', email: 'anderson.ferreira@email.com', convenio: 'SulAmérica', observacoes: 'Check-up cardiológico' },
        { id: 19, data: formatarData(24, mes, ano), horario: '16:30', paciente: 'Juliana Rocha', idade: 35, tipo: 'Consulta', status: 'pendente', telefone: '(11) 96789-0123', email: 'juliana.rocha@email.com', convenio: 'Bradesco Saúde', observacoes: 'Sintomas de gripe' },
        
        // Consultas de AMANHÃ
        { id: 20, data: formatarData(dia + 1, mes, ano), horario: '14:00', paciente: 'Roberto Alves', idade: 52, tipo: 'Exame', status: 'agendado', telefone: '(11) 97654-3210', email: 'roberto.alves@email.com', convenio: 'Bradesco Saúde', observacoes: 'Resultado de exames de rotina' },
        { id: 21, data: formatarData(dia + 1, mes, ano), horario: '15:30', paciente: 'Patrícia Mendes', idade: 39, tipo: 'Retorno', status: 'agendado', telefone: '(11) 96543-2109', email: 'patricia.mendes@email.com', convenio: 'Unimed', observacoes: 'Controle de diabetes' },
        
        // Histórico (consultas passadas)
        { id: 22, data: formatarData(dia - 5, mes, ano), horario: '10:00', paciente: 'José Augusto Lima', idade: 62, tipo: 'Consulta', status: 'realizado', telefone: '(11) 98765-1234', email: 'jose.lima@email.com', convenio: 'Unimed', observacoes: 'Consulta realizada - paciente estável' },
        { id: 23, data: formatarData(dia - 10, mes, ano), horario: '14:30', paciente: 'Maria Aparecida Souza', idade: 55, tipo: 'Retorno', status: 'realizado', telefone: '(11) 97654-3219', email: 'maria.souza@email.com', convenio: 'Amil', observacoes: 'Retorno agendado - exames ok' }
    ];
    
    let consultasFiltradas = [...consultas];
    let consultaAtual = null;
    
    function getStatusClass(status) {
        const classes = { 'confirmado': 'status-confirmado', 'agendado': 'status-agendado', 'pendente': 'status-pendente', 'realizado': 'status-realizado', 'cancelado': 'status-cancelado' };
        return classes[status] || 'status-pendente';
    }
    
    function getStatusText(status) {
        const textos = { 'confirmado': 'Confirmado', 'agendado': 'Agendado', 'pendente': 'Pendente', 'realizado': 'Realizado', 'cancelado': 'Cancelado' };
        return textos[status] || status;
    }
    
    function renderizarProximas() {
        const tbody = document.getElementById('tabelaProximas');
        if (!tbody) return;
        
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const proximas = consultasFiltradas.filter(c => {
            const [dia, mes, ano] = c.data.split('/');
            const dataConsulta = new Date(ano, mes - 1, dia);
            return dataConsulta >= hoje && c.status !== 'realizado' && c.status !== 'cancelado';
        });
        
        if (proximas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">Nenhuma consulta encontrada</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        proximas.forEach(consulta => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td data-label="Data">${consulta.data}</td>
                <td data-label="Horário">${consulta.horario}</td>
                <td data-label="Paciente"><strong>${consulta.paciente}</strong></td>
                <td data-label="Idade">${consulta.idade} anos</td>
                <td data-label="Tipo">${consulta.tipo}</td>
                <td data-label="Status"><span class="status ${getStatusClass(consulta.status)}">${getStatusText(consulta.status)}</span></td>
                <td data-label="Ações" class="btn-acoes">
                    <button class="btn-detalhes" data-id="${consulta.id}">Detalhes</button>
                    ${consulta.status !== 'cancelado' && consulta.status !== 'realizado' ? `<button class="btn-cancelar" data-id="${consulta.id}">Cancelar</button>` : ''}
                </td>
            `;
        });
        
        adicionarEventosBotoes();
    }
    
    function renderizarHistorico() {
        const tbody = document.getElementById('tabelaHistorico');
        if (!tbody) return;
        
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const historico = consultasFiltradas.filter(c => {
            const [dia, mes, ano] = c.data.split('/');
            const dataConsulta = new Date(ano, mes - 1, dia);
            return dataConsulta < hoje || c.status === 'realizado' || c.status === 'cancelado';
        });
        
        if (historico.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">Nenhuma consulta encontrada</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        historico.forEach(consulta => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td data-label="Data">${consulta.data}</td>
                <td data-label="Horário">${consulta.horario}</td>
                <td data-label="Paciente"><strong>${consulta.paciente}</strong></td>
                <td data-label="Idade">${consulta.idade} anos</td>
                <td data-label="Tipo">${consulta.tipo}</td>
                <td data-label="Status"><span class="status ${getStatusClass(consulta.status)}">${getStatusText(consulta.status)}</span></td>
                <td data-label="Ações" class="btn-acoes">
                    <button class="btn-detalhes" data-id="${consulta.id}">Detalhes</button>
                </td>
            `;
        });
        
        adicionarEventosBotoes();
    }
    
    function adicionarEventosBotoes() {
        document.querySelectorAll('.btn-detalhes').forEach(btn => {
            btn.removeEventListener('click', handleDetalhes);
            btn.addEventListener('click', handleDetalhes);
        });
        
        document.querySelectorAll('.btn-cancelar').forEach(btn => {
            btn.removeEventListener('click', handleCancelar);
            btn.addEventListener('click', handleCancelar);
        });
    }
    
    function handleDetalhes(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const consulta = consultas.find(c => c.id === id);
        if (consulta) abrirModal(consulta);
    }
    
    function handleCancelar(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const consulta = consultas.find(c => c.id === id);
        
        if (consulta) {
            mostrarConfirmacaoPersonalizada(
                'Cancelar Consulta',
                `Tem certeza que deseja cancelar a consulta de ${consulta.paciente}?`,
                function() {
                    consulta.status = 'cancelado';
                    aplicarFiltros();
                    mostrarAlertaPersonalizado('Sucesso', `Consulta de ${consulta.paciente} cancelada com sucesso!`, 'sucesso');
                },
                function() {
                    console.log('Cancelamento abortado');
                }
            );
        }
    }
    
    function abrirModal(consulta) {
        const modal = document.getElementById('modalDetalhes');
        const modalBody = document.getElementById('modalBody');
        const btnCancelarConsulta = document.querySelector('.btn-cancelar-consulta');
        
        if (!modal || !modalBody) return;
        consultaAtual = consulta;
        
        modalBody.innerHTML = `
            <div class="detalhes-item"><strong>Paciente:</strong> ${consulta.paciente}</div>
            <div class="detalhes-item"><strong>Idade:</strong> ${consulta.idade} anos</div>
            <div class="detalhes-item"><strong>Data:</strong> ${consulta.data} às ${consulta.horario}</div>
            <div class="detalhes-item"><strong>Tipo:</strong> ${consulta.tipo}</div>
            <div class="detalhes-item"><strong>Telefone:</strong> ${consulta.telefone}</div>
            <div class="detalhes-item"><strong>E-mail:</strong> ${consulta.email}</div>
            <div class="detalhes-item"><strong>Convênio:</strong> ${consulta.convenio}</div>
            <div class="detalhes-item"><strong>Observações:</strong> ${consulta.observacoes}</div>
            <div class="detalhes-item"><strong>Status:</strong> <span class="status ${getStatusClass(consulta.status)}">${getStatusText(consulta.status)}</span></div>
        `;
        
        if (consulta.status !== 'cancelado' && consulta.status !== 'realizado') {
            btnCancelarConsulta.style.display = 'block';
        } else {
            btnCancelarConsulta.style.display = 'none';
        }
        
        modal.style.display = 'flex';
    }
    
    function fecharModal() {
        const modal = document.getElementById('modalDetalhes');
        if (modal) modal.style.display = 'none';
        consultaAtual = null;
    }
    
    function cancelarConsultaDoModal() {
        if (consultaAtual) {
            mostrarConfirmacaoPersonalizada(
                'Cancelar Consulta',
                `Cancelar consulta de ${consultaAtual.paciente}?`,
                function() {
                    const consulta = consultas.find(c => c.id === consultaAtual.id);
                    if (consulta) {
                        consulta.status = 'cancelado';
                        aplicarFiltros();
                        fecharModal();
                        mostrarAlertaPersonalizado('Sucesso', `Consulta de ${consulta.paciente} cancelada!`, 'sucesso');
                    }
                },
                function() {}
            );
        }
    }
    
    function aplicarFiltros() {
        const periodo = document.getElementById('filtroPeriodo').value;
        const statusFiltro = document.getElementById('filtroStatus').value;
        const busca = document.getElementById('buscaPaciente').value.toLowerCase();
        
        consultasFiltradas = consultas.filter(consulta => {
            if (periodo !== 'todas') {
                const [dia, mes, ano] = consulta.data.split('/');
                const dataConsulta = new Date(ano, mes - 1, dia);
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                
                if (periodo === 'hoje' && dataConsulta.toDateString() !== hoje.toDateString()) return false;
                if (periodo === 'semana') {
                    const diff = (dataConsulta - hoje) / (1000 * 60 * 60 * 24);
                    if (diff < 0 || diff > 7) return false;
                }
                if (periodo === 'mes') {
                    const diff = (dataConsulta - hoje) / (1000 * 60 * 60 * 24);
                    if (diff < 0 || diff > 30) return false;
                }
            }
            if (statusFiltro !== 'todas' && consulta.status !== statusFiltro) return false;
            if (busca && !consulta.paciente.toLowerCase().includes(busca)) return false;
            return true;
        });
        
        const abaAtiva = document.querySelector('.tab-btn.active')?.getAttribute('data-tab');
        if (abaAtiva === 'proximas') renderizarProximas();
        else renderizarHistorico();
    }
    
    function limparFiltros() {
        document.getElementById('filtroPeriodo').value = 'todas';
        document.getElementById('filtroStatus').value = 'todas';
        document.getElementById('buscaPaciente').value = '';
        consultasFiltradas = [...consultas];
        
        const abaAtiva = document.querySelector('.tab-btn.active')?.getAttribute('data-tab');
        if (abaAtiva === 'proximas') renderizarProximas();
        else renderizarHistorico();
    }
    
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabProximas = document.getElementById('tabProximas');
        const tabHistorico = document.getElementById('tabHistorico');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (tabId === 'proximas') {
                    tabProximas.classList.add('active');
                    tabHistorico.classList.remove('active');
                    renderizarProximas();
                } else {
                    tabHistorico.classList.add('active');
                    tabProximas.classList.remove('active');
                    renderizarHistorico();
                }
            });
        });
    }
    
    document.getElementById('btnFiltrar')?.addEventListener('click', aplicarFiltros);
    document.getElementById('btnLimpar')?.addEventListener('click', limparFiltros);
    document.querySelector('.modal-close')?.addEventListener('click', fecharModal);
    document.querySelector('.btn-fechar-modal')?.addEventListener('click', fecharModal);
    document.querySelector('.btn-cancelar-consulta')?.addEventListener('click', cancelarConsultaDoModal);
    
    initTabs();
    renderizarProximas();
    renderizarHistorico();
    
    console.log('Página de consultas carregada com sucesso!');
});