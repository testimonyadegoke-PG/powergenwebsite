import type { ProjectModel } from '../data/projectsData';

interface ProjectModalProps {
  project: ProjectModel | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-wrapper">
        
        <div 
          className="modal-header" 
          id="modal-header" 
          style={{ backgroundImage: `url('${project.image}')` }}
        >
          <button 
            className="modal-close-btn" 
            id="modal-close-btn" 
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="modal-header-info">
            <span id="modal-tag">{project.tag}</span>
            <h2 id="modal-title">{project.title}</h2>
          </div>
        </div>
        
        <div className="modal-body">
          <table className="modal-table">
            <tbody id="modal-table-body">
              {Object.entries(project.table).map(([key, val]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <h3 style={{ marginBottom: '0.8rem', fontSize: '1.2rem' }}>Project Overview</h3>
          <p id="modal-description-text" style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            {project.challenge}
          </p>
        </div>
        
      </div>
    </div>
  );
};
