import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    cities
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
  }
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Cập nhật công việc' : 'Thêm việc'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow
          labelText='Vị trí'
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
          labelText='Công ty'
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRowSelect
            labelText='Khu vực'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
            list={cities.filter(option=>option.name)}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            labelText='Trạng thái'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions.filter(option => option.name !== 'all')}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='Loại hình'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions.filter(option => option.name !== 'all')}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Lưu
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              Reset form
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
