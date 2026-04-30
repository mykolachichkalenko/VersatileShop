import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import UserReviewsContainer
    from "@/components/PageComponents/ReviewsPageComponents/UserReviewsComponents/UserReviewsContainer.tsx";

export default function UserReviewsPage(){
    return (
      <DefaultComponent>
          <UserReviewsContainer/>
      </DefaultComponent>
    );
}