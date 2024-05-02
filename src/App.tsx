import { useForm } from 'react-hook-form';
import DynamicFields from './components/DynamicFields';
import { MockDynamicData } from './utils/MockDynamicData';

function App() {
  const useFormHook = useForm({
    defaultValues: {}, // Assign initial/default values if applicable
    mode: 'all',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
  });

  const handleSignUp = () => {
    console.log(useFormHook.getValues());
  };

  const renderDynamicFields = MockDynamicData.map((formControl, index) => (
    <DynamicFields
      key={index}
      divClass="col-12 form-group mb-3"
      inputClass="form-control"
      formHook={useFormHook}
      formControl={formControl}
    />
  ));

  return (
    <div className="row">
      <div className="col-12 mt-5">
        <div className="d-flex justify-content-center mt-5">
          <div className="card mx-3">
            <h5 className="card-header">
              React + UseForm (react-hook-form) Dynamic Form Example
            </h5>
            <div className="card-body">
              <form>
                <div className="row">{renderDynamicFields}</div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={useFormHook.handleSubmit(handleSignUp)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
