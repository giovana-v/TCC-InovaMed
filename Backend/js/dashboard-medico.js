// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== //
    // ALERTAS PERSONALIZADOS //
    // ==================== //
    
    function mostrarAlerta(titulo, mensagem, tipo, callback) {
        const alertExistente = document.querySelector('.alert-overlay');
        if (alertExistente) alertExistente.remove();
        
        let icone = '';
        switch(tipo) {
            case 'sucesso': icone = '✓'; break;
            case 'erro': icone = '✗'; break;
            case 'info': icone = 'ℹ'; break;
            case 'alerta': icone = '⚠'; break;
            default: icone = '';
        }
        
        const alertHTML = `
            <div class="alert-overlay">
                <div class="alert-container ${tipo}">
                    <div class="alert-header">
                        <span class="alert-icon">${icone}</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="alert-body">
                        <p>${mensagem}</p>
                    </div>
                    <div class="alert-footer">
                        <button class="btn-alert" onclick="this.closest('.alert-overlay').remove(); ${callback ? '(' + callback + ')()' : ''}">OK</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
    }
    
    function mostrarAlertaComDetalhes(titulo, mensagem, detalhes, tipo) {
        const alertExistente = document.querySelector('.alert-overlay');
        if (alertExistente) alertExistente.remove();
        
        let icone = '';
        switch(tipo) {
            case 'sucesso': icone = '✓'; break;
            case 'erro': icone = '✗'; break;
            case 'info': icone = 'ℹ'; break;
            default: icone = '';
        }
        
        const alertHTML = `
            <div class="alert-overlay">
                <div class="alert-container ${tipo}">
                    <div class="alert-header">
                        <span class="alert-icon">${icone}</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="alert-body">
                        <p>${mensagem}</p>
                        <div class="alert-detalhes">
                            ${detalhes}
                        </div>
                    </div>
                    <div class="alert-footer">
                        <button class="btn-alert" onclick="this.closest('.alert-overlay').remove()">OK</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHTML);
    }
    
    // FUNÇÃO DE CONFIRMAÇÃO COM BARRA AZUL
    function mostrarConfirmacao(titulo, mensagem, onConfirm, onCancel) {
        const alertExistente = document.querySelector('.alert-overlay');
        if (alertExistente) alertExistente.remove();
        
        const confirmHTML = `
            <div class="alert-overlay">
                <div class="alert-container confirmacao">
                    <div class="alert-header confirmacao-header">
                        <span class="alert-icon">?</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="alert-body">
                        <p>${mensagem}</p>
                    </div>
                    <div class="alert-footer">
                        <button class="btn-confirmar-sim" id="btnConfirmarSim">Sim</button>
                        <button class="btn-confirmar-nao" id="btnConfirmarNao">Não</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', confirmHTML);
        
        // Adicionar estilos específicos para a confirmação
        if (!document.querySelector('#estilosConfirmacao')) {
            const estilos = document.createElement('style');
            estilos.id = 'estilosConfirmacao';
            estilos.textContent = `
                .alert-container.confirmacao {
                    max-width: 400px;
                    width: 90%;
                }
                .confirmacao-header {
                    background: linear-gradient(135deg, #2c7da0 0%, #1f5f7a 100%);
                    padding: 18px 25px;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .confirmacao-header .alert-icon {
                    font-size: 24px;
                    font-weight: bold;
                    background: rgba(255,255,255,0.2);
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }
                .confirmacao-header h3 {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 0;
                }
                .alert-container.confirmacao .alert-body {
                    padding: 25px;
                    text-align: center;
                }
                .alert-container.confirmacao .alert-body p {
                    color: #2c3e50;
                    font-size: 15px;
                    margin: 0;
                }
                .alert-container.confirmacao .alert-footer {
                    padding: 15px 25px 25px 25px;
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    border-top: none;
                }
                .btn-confirmar-sim {
                    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
                    color: white;
                    border: none;
                    padding: 10px 30px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    min-width: 100px;
                }
                .btn-confirmar-sim:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
                }
                .btn-confirmar-nao {
                    background-color: #f0f2f5;
                    color: #5a6e7c;
                    border: 1px solid #d0d7de;
                    padding: 10px 30px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    min-width: 100px;
                }
                .btn-confirmar-nao:hover {
                    background-color: #e8ecef;
                    transform: translateY(-2px);
                }
            `;
            document.head.appendChild(estilos);
        }

        
        
        document.getElementById('btnConfirmarSim')?.addEventListener('click', () => {
            document.querySelector('.alert-overlay')?.remove();
            if (onConfirm) onConfirm();
        });
        
        document.getElementById('btnConfirmarNao')?.addEventListener('click', () => {
            document.querySelector('.alert-overlay')?.remove();
            if (onCancel) onCancel();
        });
    }
    
    // ==================== //
    // DADOS DO MÉDICO      //
    // ==================== //
    
    const medico = {
        nome: 'Dr. Carlos Silva',
        especialidade: 'Cardiologia',
        crm: '12345-SP'
    };
    
    const medicoNomeSpan = document.getElementById('medicoNome');
    if (medicoNomeSpan) {
        medicoNomeSpan.innerHTML = ` ${medico.nome}`;
    }
    
    // ==================== //
    // DADOS DE EXEMPLO     //
    // ==================== //
    
    const consultasHoje = [
        { horario: '08:00', paciente: 'João Silva', idade: 45, telefone: '(11) 98765-4321', tipo: 'Consulta', status: 'confirmado' },
        { horario: '09:30', paciente: 'Maria Santos', idade: 32, telefone: '(11) 91234-5678', tipo: 'Retorno', status: 'confirmado' },
        { horario: '11:00', paciente: 'Pedro Oliveira', idade: 28, telefone: '(11) 99876-5432', tipo: 'Consulta', status: 'confirmado' },
        { horario: '14:00', paciente: 'Ana Costa', idade: 52, telefone: '(11) 97654-3210', tipo: 'Exame', status: 'confirmado' },
        { horario: '15:30', paciente: 'Lucas Ferreira', idade: 35, telefone: '(11) 96543-2109', tipo: 'Retorno', status: 'confirmado' },
        { horario: '17:00', paciente: 'Fernanda Lima', idade: 41, telefone: '(11) 95432-1098', tipo: 'Consulta', status: 'confirmado' }
    ];
    
    const proximasConsultas = [
        { data: '17/06/2026', horario: '10:00', paciente: 'Fernanda Lima', tipo: 'Consulta', status: 'agendado' },
        { data: '19/06/2026', horario: '14:30', paciente: 'Ricardo Alves', tipo: 'Retorno', status: 'agendado' },
        { data: '20/06/2026', horario: '09:00', paciente: 'Camila Rocha', tipo: 'Consulta', status: 'agendado' },
        { data: '22/06/2026', horario: '16:00', paciente: 'Thiago Mendes', tipo: 'Exame', status: 'agendado' },
        { data: '25/06/2026', horario: '11:00', paciente: 'Patrícia Souza', tipo: 'Consulta', status: 'agendado' },
        { data: '28/06/2026', horario: '08:30', paciente: 'Roberto Santos', tipo: 'Retorno', status: 'agendado' }
    ];
    
    let horariosAtendimento = [
        { dia: 'Segunda-feira', periodo: '08:00 - 12:00 | 14:00 - 18:00', status: 'ativo' },
        { dia: 'Terça-feira', periodo: '08:00 - 12:00 | 14:00 - 18:00', status: 'ativo' },
        { dia: 'Quarta-feira', periodo: '08:00 - 12:00 | 14:00 - 18:00', status: 'ativo' },
        { dia: 'Quinta-feira', periodo: '08:00 - 12:00', status: 'ativo' },
        { dia: 'Sexta-feira', periodo: '08:00 - 12:00 | 14:00 - 18:00', status: 'ativo' },
        { dia: 'Sábado', periodo: '08:00 - 12:00', status: 'inativo' },
        { dia: 'Domingo', periodo: 'Fechado', status: 'inativo' }
    ];
    
    function carregarHorariosSalvos() {
        const saved = localStorage.getItem('horarios_atendimento');
        if (saved) horariosAtendimento = JSON.parse(saved);
    }
    
    function salvarHorarios() {
        localStorage.setItem('horarios_atendimento', JSON.stringify(horariosAtendimento));
    }
    
    // ==================== //
    // MODAL DE ATENDIMENTO  //
    // ==================== //
    
    function abrirModalAtendimento(paciente, consulta) {
        const modalExistente = document.getElementById('modalAtendimento');
        if (modalExistente) modalExistente.remove();
        
        const modalHTML = `
            <div id="modalAtendimento" class="modal-atendimento">
                <div class="modal-atendimento-content">
                    <div class="modal-header">
                        <h3>Atendimento - ${paciente}</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="info-paciente">
                            <div class="info-item"><strong>Idade:</strong> ${consulta.idade || '--'} anos</div>
                            <div class="info-item"><strong>Telefone:</strong> ${consulta.telefone || '--'}</div>
                            <div class="info-item"><strong>Data/Hora:</strong> ${new Date().toLocaleDateString()} - ${consulta.horario}</div>
                        </div>
                        
                        <div class="abas-atendimento">
                            <button class="aba-btn active" data-aba="prontuario">Prontuário</button>
                            <button class="aba-btn" data-aba="exames">Exames</button>
                            <button class="aba-btn" data-aba="prescricao">Prescrição</button>
                            <button class="aba-btn" data-aba="atestado">Atestado</button>
                        </div>
                        
                        <div id="abaProntuario" class="aba-conteudo active">
                            <div class="form-group">
                                <label>Anamnese</label>
                                <textarea id="anamnese" rows="3" placeholder="Queixas principais, histórico familiar..."></textarea>
                            </div>
                            <div class="form-group">
                                <label>Sinais Vitais</label>
                                <div class="sinais-vitais">
                                    <input type="text" id="pressao" placeholder="Pressão arterial">
                                    <input type="text" id="temperatura" placeholder="Temperatura">
                                    <input type="text" id="frequencia" placeholder="Freq. cardíaca">
                                    <input type="text" id="oxigenacao" placeholder="Oximetria">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Exame Físico</label>
                                <textarea id="exameFisico" rows="2" placeholder="Ausculta, palpação..."></textarea>
                            </div>
                            <div class="form-group">
                                <label>Hipótese Diagnóstica</label>
                                <input type="text" id="hipotese" placeholder="Ex: Hipertensão arterial">
                            </div>
                            <div class="form-group">
                                <label>CID</label>
                                <input type="text" id="cid" placeholder="Ex: I10 - Hipertensão essencial">
                            </div>
                        </div>
                        
                        <div id="abaExames" class="aba-conteudo">
                            <div class="form-group">
                                <label>Solicitar Exames</label>
                                <div class="exames-lista">
                                    <label><input type="checkbox" value="Hemograma"> Hemograma completo</label>
                                    <label><input type="checkbox" value="Glicemia"> Glicemia de jejum</label>
                                    <label><input type="checkbox" value="Colesterol"> Perfil lipídico</label>
                                    <label><input type="checkbox" value="Urina"> Exame de urina</label>
                                    <label><input type="checkbox" value="Raio-X"> Raio-X de tórax</label>
                                    <label><input type="checkbox" value="Ultrassom"> Ultrassonografia</label>
                                    <label><input type="checkbox" value="ECG"> Eletrocardiograma</label>
                                    <label><input type="checkbox" value="Ressonancia"> Ressonância magnética</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Outros exames</label>
                                <input type="text" id="outrosExames" placeholder="Digite outros exames...">
                            </div>
                        </div>
                        
                        <div id="abaPrescricao" class="aba-conteudo">
                            <div class="form-group">
                                <label>Medicamentos</label>
                                <div id="medicamentosLista" class="medicamentos-lista">
                                    <div class="medicamento-item">
                                        <input type="text" placeholder="Medicamento" class="med-nome">
                                        <input type="text" placeholder="Dosagem" class="med-dosagem" style="width: 100px;">
                                        <input type="text" placeholder="Frequência" class="med-frequencia" style="width: 120px;">
                                        <input type="text" placeholder="Duração" class="med-duracao" style="width: 100px;">
                                        <button type="button" class="btn-remover-med">✖</button>
                                    </div>
                                </div>
                                <button type="button" id="btnAdicionarMed" class="btn-adicionar-med">+ Adicionar medicamento</button>
                            </div>
                            <div class="form-group">
                                <label>Orientações</label>
                                <textarea id="orientacoes" rows="3" placeholder="Dieta, repouso, atividades físicas..."></textarea>
                            </div>
                        </div>
                        
                        <div id="abaAtestado" class="aba-conteudo">
                            <div class="form-group">
                                <label>Tipo de Atestado</label>
                                <div class="atestado-opcoes">
                                    <label><input type="radio" name="atestadoTipo" value="comparecimento" checked> Atestado de comparecimento</label>
                                    <label><input type="radio" name="atestadoTipo" value="repouso"> Atestado de repouso</label>
                                </div>
                            </div>
                            <div class="form-group" id="grupoRepouso" style="display: none;">
                                <label>Dias de repouso:</label>
                                <input type="number" id="diasRepouso" min="1" max="30" value="1" style="width: 100px;">
                                <label style="margin-left: 10px;">CID:</label>
                                <input type="text" id="cidAtestado" placeholder="CID" style="width: 150px;">
                            </div>
                            <div class="form-group">
                                <label>Observações do atestado:</label>
                                <textarea id="atestadoObs" rows="2" placeholder="Informações adicionais..."></textarea>
                            </div>
                            <button type="button" id="btnGerarAtestado" class="btn-gerar-atestado">Gerar Atestado</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnFinalizarAtendimento" class="btn-finalizar">Finalizar Atendimento</button>
                        <button id="btnCancelarAtendimento" class="btn-cancelar-atendimento">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Configurar abas
        document.querySelectorAll('.aba-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const aba = this.getAttribute('data-aba');
                document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.aba-conteudo').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(`aba${aba.charAt(0).toUpperCase() + aba.slice(1)}`).classList.add('active');
            });
        });
        
        // Atestado - mostrar/ocultar grupo de repouso
        document.querySelectorAll('input[name="atestadoTipo"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const grupoRepouso = document.getElementById('grupoRepouso');
                if (this.value === 'repouso') {
                    grupoRepouso.style.display = 'flex';
                } else {
                    grupoRepouso.style.display = 'none';
                }
            });
        });
        
        // Adicionar medicamento
        document.getElementById('btnAdicionarMed')?.addEventListener('click', function() {
            const container = document.getElementById('medicamentosLista');
            const newItem = document.createElement('div');
            newItem.className = 'medicamento-item';
            newItem.innerHTML = `
                <input type="text" placeholder="Medicamento" class="med-nome">
                <input type="text" placeholder="Dosagem" class="med-dosagem" style="width: 100px;">
                <input type="text" placeholder="Frequência" class="med-frequencia" style="width: 120px;">
                <input type="text" placeholder="Duração" class="med-duracao" style="width: 100px;">
                <button type="button" class="btn-remover-med">✖</button>
            `;
            container.appendChild(newItem);
            newItem.querySelector('.btn-remover-med').addEventListener('click', () => newItem.remove());
        });
        
        // Remover medicamento
        document.querySelectorAll('.btn-remover-med').forEach(btn => {
            btn.addEventListener('click', function() { 
                this.closest('.medicamento-item').remove(); 
            });
        });
        
        // Gerar atestado
        document.getElementById('btnGerarAtestado')?.addEventListener('click', function() {
            const tipo = document.querySelector('input[name="atestadoTipo"]:checked').value;
            const dataAtual = new Date().toLocaleDateString();
            let atestadoDetalhes = '';
            
            if (tipo === 'comparecimento') {
                atestadoDetalhes = `<strong>Paciente:</strong> ${paciente}<br>
                                   <strong>Data:</strong> ${dataAtual}<br>
                                   <strong>Médico:</strong> ${medico.nome}<br>
                                   <strong>CRM:</strong> ${medico.crm}<br>
                                   <strong>Tipo:</strong> Atestado de Comparecimento`;
            } else {
                const dias = document.getElementById('diasRepouso').value;
                const cid = document.getElementById('cidAtestado').value;
                atestadoDetalhes = `<strong>Paciente:</strong> ${paciente}<br>
                                   <strong>CID:</strong> ${cid}<br>
                                   <strong>Dias de repouso:</strong> ${dias}<br>
                                   <strong>Data:</strong> ${dataAtual}<br>
                                   <strong>Médico:</strong> ${medico.nome}<br>
                                   <strong>CRM:</strong> ${medico.crm}<br>
                                   <strong>Tipo:</strong> Atestado de Repouso`;
            }
            
            mostrarAlertaComDetalhes('Atestado Médico', 'Atestado gerado com sucesso!', atestadoDetalhes, 'sucesso');
        });
        
        // Finalizar atendimento
        document.getElementById('btnFinalizarAtendimento')?.addEventListener('click', function() {
            const diagnostico = document.getElementById('hipotese')?.value || '';
            const pressao = document.getElementById('pressao')?.value || '';
            const prescricao = Array.from(document.querySelectorAll('.med-nome')).map(m => m.value).filter(v => v).join(', ');
            
            const detalhes = `<strong>Paciente:</strong> ${paciente}<br>
                             <strong>Data:</strong> ${new Date().toLocaleString()}<br>
                             <strong>Médico:</strong> ${medico.nome}<br>
                             <strong>Diagnóstico:</strong> ${diagnostico || 'Não informado'}<br>
                             <strong>Pressão:</strong> ${pressao || 'Não aferida'}<br>
                             <strong>Prescrição:</strong> ${prescricao || 'Nenhuma'}`;
            
            mostrarAlertaComDetalhes('Atendimento Finalizado', 'O atendimento foi concluído com sucesso!', detalhes, 'sucesso');
            
            document.getElementById('modalAtendimento')?.remove();
            
            const consultaIndex = consultasHoje.findIndex(c => c.paciente === paciente);
            if (consultaIndex !== -1) {
                consultasHoje[consultaIndex].status = 'realizado';
                renderizarConsultasHoje();
                atualizarEstatisticas();
            }
        });
        
        // Cancelar atendimento - COM CONFIRMAÇÃO COM BARRA AZUL
        document.getElementById('btnCancelarAtendimento')?.addEventListener('click', function() {
            mostrarConfirmacao(
                'Cancelar Atendimento', 
                'Tem certeza que deseja cancelar este atendimento? Os dados não serão salvos.', 
                function() { 
                    document.getElementById('modalAtendimento')?.remove(); 
                    mostrarAlerta('Atendimento Cancelado', 'O atendimento foi cancelado com sucesso!', 'info');
                },
                function() { 
                    console.log('Cancelamento abortado'); 
                }
            );
        });
        
        // Fechar modal - COM CONFIRMAÇÃO COM BARRA AZUL
        document.querySelector('.close-modal')?.addEventListener('click', function() {
            mostrarConfirmacao(
                'Fechar Atendimento', 
                'Tem certeza que deseja fechar? Os dados não salvos serão perdidos.',
                function() { 
                    document.getElementById('modalAtendimento')?.remove(); 
                },
                function() { 
                    console.log('Fechamento abortado'); 
                }
            );
        });
    }
    
    // ==================== //
    // MODAL DE HORÁRIOS    //
    // ==================== //
    
    function criarModalHorarios() {
        const modalExistente = document.getElementById('modalEditarHorarios');
        if (modalExistente) modalExistente.remove();
        
        const modalHTML = `
            <div id="modalEditarHorarios" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Editar Horários de Atendimento</h3>
                        <span class="modal-close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div id="horariosEditaveis"></div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnSalvarHorarios" class="btn-salvar">Salvar Alterações</button>
                        <button id="btnCancelarModal" class="btn-cancelar-modal">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('modalEditarHorarios');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelarBtn = document.getElementById('btnCancelarModal');
        
        closeBtn.addEventListener('click', () => fecharModalHorarios());
        cancelarBtn.addEventListener('click', () => fecharModalHorarios());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fecharModalHorarios();
        });
    }
    
    function abrirModalEditarHorarios() {
        criarModalHorarios();
        
        const modal = document.getElementById('modalEditarHorarios');
        const horariosEditaveis = document.getElementById('horariosEditaveis');
        
        if (!modal || !horariosEditaveis) return;
        
        let html = '';
        horariosAtendimento.forEach((horario, index) => {
            html += `
                <div class="horario-edicao-item">
                    <div class="horario-edicao-dia">${horario.dia}</div>
                    <div class="horario-edicao-periodo">
                        <input type="text" id="periodo_${index}" value="${horario.periodo}" placeholder="Ex: 08:00 - 12:00">
                    </div>
                    <div class="horario-edicao-status">
                        <select id="status_${index}">
                            <option value="ativo" ${horario.status === 'ativo' ? 'selected' : ''}>Ativo</option>
                            <option value="inativo" ${horario.status === 'inativo' ? 'selected' : ''}>Inativo</option>
                        </select>
                    </div>
                </div>
            `;
        });
        
        horariosEditaveis.innerHTML = html;
        modal.style.display = 'flex';
        
        const btnSalvar = document.getElementById('btnSalvarHorarios');
        if (btnSalvar) {
            const novoBtn = btnSalvar.cloneNode(true);
            btnSalvar.parentNode.replaceChild(novoBtn, btnSalvar);
            novoBtn.addEventListener('click', salvarHorariosEditados);
        }
    }
    
    function salvarHorariosEditados() {
        horariosAtendimento.forEach((horario, index) => {
            const periodoInput = document.getElementById(`periodo_${index}`);
            const statusSelect = document.getElementById(`status_${index}`);
            if (periodoInput) horario.periodo = periodoInput.value;
            if (statusSelect) horario.status = statusSelect.value;
        });
        
        salvarHorarios();
        renderizarHorarios();
        fecharModalHorarios();
        mostrarMensagem('Horários atualizados com sucesso!', 'sucesso');
    }
    
    function fecharModalHorarios() {
        const modal = document.getElementById('modalEditarHorarios');
        if (modal) {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        }
    }
    
    function mostrarMensagem(texto, tipo) {
        const msgAnterior = document.querySelector('.mensagem-flutuante');
        if (msgAnterior) msgAnterior.remove();
        
        const mensagem = document.createElement('div');
        mensagem.className = 'mensagem-flutuante';
        mensagem.textContent = texto;
        mensagem.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; padding: 12px 20px;
            border-radius: 8px; font-size: 14px; font-weight: 500; z-index: 1001;
            animation: slideIn 0.3s ease;
            background-color: ${tipo === 'sucesso' ? '#d4edda' : '#f8d7da'};
            color: ${tipo === 'sucesso' ? '#155724' : '#721c24'};
            border: 1px solid ${tipo === 'sucesso' ? '#c3e6cb' : '#f5c6cb'};
        `;
        document.body.appendChild(mensagem);
        setTimeout(() => mensagem.remove(), 3000);
    }
    
    const styleAnimacoes = document.createElement('style');
    styleAnimacoes.textContent = `
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    `;
    document.head.appendChild(styleAnimacoes);
    
    // ==================== //
    // RENDERIZAÇÃO         //
    // ==================== //
    
    function atualizarEstatisticas() {
        const totalHoje = document.getElementById('totalHoje');
        const totalConfirmadas = document.getElementById('totalConfirmadas');
        const totalPacientes = document.getElementById('totalPacientes');
        const proximasConsultasElem = document.getElementById('proximasConsultas');
        
        if (totalHoje) totalHoje.innerText = consultasHoje.length;
        if (totalConfirmadas) totalConfirmadas.innerText = consultasHoje.filter(c => c.status === 'confirmado').length;
        if (totalPacientes) totalPacientes.innerText = '128';
        if (proximasConsultasElem) proximasConsultasElem.innerText = proximasConsultas.length;
    }
    
    function renderizarConsultasHoje() {
        const container = document.getElementById('consultasHoje');
        if (!container) return;
        
        if (consultasHoje.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 30px;">Nenhuma consulta agendada para hoje.</div>';
            return;
        }
        
        let html = `<table class="tabela-consultas">
            <thead><tr><th>Horário</th><th>Paciente</th><th>Tipo</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>`;
        
        consultasHoje.forEach(consulta => {
            let statusClass = '', statusText = '';
            switch(consulta.status) {
                case 'confirmado': statusClass = 'status-confirmado'; statusText = 'Confirmado'; break;
                case 'agendado': statusClass = 'status-agendado'; statusText = 'Agendado'; break;
                case 'pendente': statusClass = 'status-pendente'; statusText = 'Pendente'; break;
                case 'realizado': statusClass = 'status-realizado'; statusText = 'Realizado'; break;
                default: statusClass = 'status-pendente'; statusText = consulta.status;
            }
            
            html += `<tr>
                <td data-label="Horário">${consulta.horario}</td>
                <td data-label="Paciente">${consulta.paciente}</td>
                <td data-label="Tipo">${consulta.tipo}</td>
                <td data-label="Status"><span class="status ${statusClass}">${statusText}</span></td>
                <td data-label="Ações">
                    ${consulta.status !== 'realizado' ? `<button class="btn-iniciar" data-paciente="${consulta.paciente}" data-horario="${consulta.horario}" data-idade="${consulta.idade}" data-telefone="${consulta.telefone}">Iniciar Atendimento</button>` : '<span style="color:#28a745;">Finalizado</span>'}
                </td>
            </tr>`;
        });
        
        html += `</tbody></table>`;
        container.innerHTML = html;
        
        document.querySelectorAll('.btn-iniciar').forEach(btn => {
            btn.addEventListener('click', function() {
                abrirModalAtendimento(this.dataset.paciente, {
                    paciente: this.dataset.paciente,
                    horario: this.dataset.horario,
                    idade: this.dataset.idade,
                    telefone: this.dataset.telefone
                });
            });
        });
    }
    
    function renderizarProximasConsultas() {
        const container = document.getElementById('proximasConsultasLista');
        if (!container) return;
        
        if (proximasConsultas.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 30px;">Nenhuma consulta futura agendada.</div>';
            return;
        }
        
        let html = `<table class="tabela-consultas">
            <thead><tr><th>Data</th><th>Horário</th><th>Paciente</th><th>Tipo</th><th>Status</th></tr></thead>
            <tbody>`;
        
        proximasConsultas.forEach(consulta => {
            let statusClass = '', statusText = '';
            switch(consulta.status) {
                case 'confirmado': statusClass = 'status-confirmado'; statusText = 'Confirmado'; break;
                case 'agendado': statusClass = 'status-agendado'; statusText = 'Agendado'; break;
                case 'pendente': statusClass = 'status-pendente'; statusText = 'Pendente'; break;
                default: statusClass = 'status-pendente'; statusText = consulta.status;
            }
            html += `<tr>
                <td data-label="Data">${consulta.data}</td>
                <td data-label="Horário">${consulta.horario}</td>
                <td data-label="Paciente">${consulta.paciente}</td>
                <td data-label="Tipo">${consulta.tipo}</td>
                <td data-label="Status"><span class="status ${statusClass}">${statusText}</span></td>
            </tr>`;
        });
        
        html += `</tbody></table>`;
        container.innerHTML = html;
    }
    
    function renderizarHorarios() {
        const container = document.getElementById('meusHorarios');
        if (!container) return;
        
        let html = '<div class="horarios-lista">';
        horariosAtendimento.forEach(horario => {
            const statusClass = horario.status === 'ativo' ? 'horario-ativo' : 'horario-inativo';
            const statusText = horario.status === 'ativo' ? 'Ativo' : 'Inativo';
            html += `
                <div class="horario-item">
                    <div class="horario-dia">${horario.dia}</div>
                    <div class="horario-periodo">${horario.periodo}</div>
                    <div class="horario-status ${statusClass}">${statusText}</div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }
    
    window.editarHorarios = function() {
        abrirModalEditarHorarios();
    };
    
    carregarHorariosSalvos();
    atualizarEstatisticas();
    renderizarConsultasHoje();
    renderizarProximasConsultas();
    renderizarHorarios();
    
});