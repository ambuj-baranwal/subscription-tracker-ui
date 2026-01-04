import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ChevronLeft} from "lucide-react";

const SubscriptionForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

    })
    const [reminders, setReminders] = useState([])
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleReminderChange = (id, field, value) => {
        setReminders(prevState => prevState.map(
           item => item.id === id ? {...item, [field]: value } : item
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //send to backend & redirect
        navigate('/dashboard')
    }
  return (
      <div className='min-h-screen bg-gray-500 flex items-center justify-center p-4 font-sans'>
          <form
          onSubmit={handleSubmit}
          className='w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6'>
              <div className='flex items-center justify-between'>
                  <button
                      type='button'
                      onClick={() => navigate('/dashboard')}
                      className='text-gray-600 hover:text-gray-900 font-medium'
                  >
                    <ChevronLeft />
                  </button>
                  <h2 className='text-2xl font-bold text-gray-800'>Add Subscription</h2>
                  {/*<p className='text-gray-500 text-sm'>Details</p>*/}
                  <button type='submit' className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm'>
                          Save
                  </button>
              </div>

              <div className='space-y-2'>
                  <label className='block text-xs font-medium text-gray-700'>Name</label>
                  <input
                      id='name'
                      type='text'
                      name='name'
                      value={formData.name}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-50 object-top-left transition'
                      placeholder='e.g. Netflix, Spotify'
                      onChange={handleChange}
                  />
              </div>

          </form>
      </div>
  )
}

export default SubscriptionForm;